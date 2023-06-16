const jwt = require("jsonwebtoken");
//model imports
const User = require("../models/UserModel");
const SECRET = "idhiadhkladkndkan980e7070270928093uhlwndkndknakdnad";


const auth = async (req, res, next) => {
    let authorization = req.headers.authorization;

    //console.log(req.headers);


    if (authorization === null | authorization === undefined) {
        return res.status(403).json({ error: "Token not found" });
    }
    //Bearer token
    

    try {
        let token = authorization.substring(7,);

        //console.log(token);
        const email = jwt.verify(token, SECRET);
        const user = await User.findOne({ email: email });
        if (user === null) {
            return res.status(403).json({ error: "Token is not valid" });
        }
        res.locals.user = user;

        return next();
    } catch (error) {
        return res.status(500).json({ error: "Token is not valid." });
    }

}

module.exports = auth;