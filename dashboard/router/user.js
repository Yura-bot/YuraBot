const express = require('express');
const router = express.Router();
const CheckAuth = require('../auth/CheckAuth');

router
.get('/', CheckAuth, async(req, res) => {
    res.status(200).json(req.user);
})
.get("/infos", CheckAuth, async(req, res) => {

    let tag = req.user.username + "#" + req.user.discriminator
    let db = await req.bot.db.getUserTag(tag)
    let points = db ? db.points : 0

    res.status(200).json({ points: points });
});

module.exports = router;