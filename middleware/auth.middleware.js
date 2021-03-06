const jwt = require("jsonwebtoken");

require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET

module.exports = (req, res, next) => {

    const Authorization = req.headers["authorization"]
    const accessToken = Authorization && Authorization.split(' ')[1]

    if (!accessToken) return res.status(400).send({"error": "access token required!"})

    try {
        const {user_id, role} = jwt.verify(accessToken, JWT_SECRET)
        req.role = role;
        req.user_id= user_id;

        next();

    } catch(err) {
        res.status(400).send({"err": err})
    }
}
