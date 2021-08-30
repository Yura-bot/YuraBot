module.exports = async (req, res, next) => {
    if(req.isAuthenticated()) {
	    return next();
    } else {
	    return res.status(401).json({ error: "NOT CONNECTED" });
    }
};