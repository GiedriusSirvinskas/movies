const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) return res.status(401).json({ error: "Neautorizuotas asmuo" });

        const verified = jwt.verify(token, "TokenPassword");
        req.userID = verified.id;

        next()

    } catch (err){
        console.error(err)
        res.status(401).json({ error: "Neautorizuotas asmuo" });
    }
}

module.exports = auth;