const express = require("express");
const session = require("express-session");

const app = express();

const passport = require("passport");
const { Strategy } = require("passport-discord");
const MongoStore = require('connect-mongo');

const { Server } = require('vuejs-oauth2-discord');

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

    var cors = require('cors');

    var whitelist = ['http://localhost:8000', 'http://localhost:8080'];
    var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
        } else {
        callback(null, false);
        }
    },
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'device-remember-token', 'Access-Control-Allow-Origin', 'Origin', 'Accept']
    };

    app.use(cors(corsOptions));

    app
        .use(bodyparser.json())
        .use(bodyparser.urlencoded({ extended: true }))
	    .set('port', config.port)
        .use(session({
            secret: config.secret,
            cookie: {
                maxAge: 60000 * 60 * 24
            },
            resave: false,
            saveUninitialized: false,
            name: "discord.oauth2",
            store: MongoStore.create({ mongoUrl: config.mongoKey })
        }))
        .use(passport.initialize())
        .use(passport.session())
        .use(function(req, res, next) {
            req.bot = client;
            next();
        })
        .use("/", require("./router/index"))
        .use("/user", require("./router/user"))
        .use("/serveurs", require("./router/serveurs"))
        //.use("/extensions", require("./router/extensions"))

        .get("*", function(req, res) {
            res.status(404).send("404");
        })
        /*
        .use(function(err, req, res, next) {
            res.status(500).send("500");
        });
        */

    // CONFIG ROUTES FOR OAUTH 2 DISCORD
    //new Server(app, `http://localhost:3000`, `http://localhost:8080`, "/discord");
        
    http.listen(app.get('port'), (err) => {

        if (err) throw err;
        console.log(`Dashboard online on port ${app.get('port')}`);
    });

    client.spawned = true;
};
