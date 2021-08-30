const express = require('express');
const router = express.Router();
const passport = require("passport");
const CheckAuth = require('../auth/CheckAuth');

let bot = require("../../main.js")

router
.get("/", async function(req, res) {
    res.status(200).json({
        status: 200
    });
})
.get("/login", passport.authenticate("discord", { failureRedirect: "/" }),
    function(req, res) {
        res.redirect("/user");
    })
.get("/logout", async function(req, res) {
    await req.logout();
    await res.redirect("/");
});


module.exports = router;