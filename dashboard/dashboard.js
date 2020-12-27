const express = require("express");
const session = require("express-session");
const vhost = require('vhost')

const app = express();

const passport = require("passport");
const { Strategy } = require("passport-discord");

const bodyparser = require("body-parser");
const path = require("path");
const morgan = require('morgan')
const config = require("../configs/config.json");

module.exports.load = async(client) => {

    const http = require('http').createServer(app);

    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((obj, done) => {
        done(null, obj);
    });

    passport.use(new Strategy({
        clientID: client.user.id,
        clientSecret: config.secret,
        callbackURL: `${config.panel_url}/login`,
        scope: ["identify", "guilds"]
    }, function(accessToken, refreshToken, profile, done) {
        process.nextTick(function() {
            return done(null, profile);
        });
    }));

    app
        .use(vhost('dash.yurabot.xyz', function handle (req, res, next) {}))
        .use(bodyparser.json())
        .use(bodyparser.urlencoded({ extended: true }))
        .engine("html", require("ejs").renderFile)
        .use(express.static(path.join(__dirname, "/public")))
        .set("view engine", "ejs")
        .set("views", path.join(__dirname, "views"))
	    .set('port', config.port)
        .use(session({
            secret: config.secret,
            resave: false,
            saveUninitialized: false
        }))
        .use(passport.initialize())
        .use(passport.session())
        .use(function(req, res, next) {
            req.bot = client;
            next();
        })
        .use("/", require("./router/index"))
        .use("/profile", require("./router/profile"))
        .use("/serveurs", require("./router/serveurs"))
        .get("*", function(req, res) {
            res.status(404).render("404");
        })
        .use(function(err, req, res, next) {
            res.status(500).send('Please refresh the page.');
        });
        

    http.listen(app.get('port'), (err) => {

        if (err) throw err;
        console.log(`Dashboard online on port ${app.get('port')}`);
    });

    process.on("unhandledRejection", (r) => {
        console.dir(r);
        client.emit('error', error, "dash");
    });
};
