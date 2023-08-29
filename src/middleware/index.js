const User = require("../users/model")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const validator = require("validator");
const saltRounds = process.env.SALT_ROUNDS

const hashPass = async (req, res, next) => {
    try {
        if (!validator.isEmail(req.body.email)) {
            return res.status(500).json({ errorMessage: "Invalid email" });
        }

        req.body.password = await bcrypt.hash(req.body.password, parseInt(saltRounds));
        console.log("hashed password =", req.body.password);
        next();
    } catch (error) {
        res.status(501).json({ errorMessage: error.message, error: error });
    }
};

const comparePass = async (req, res, next) => {
    try {
        if (!validator.isEmail(req.body.email)) {
            return res.status(500).json({ errorMessage: "Invalid email" });
        }

        req.user = await User.findOne({ where: { username: req.body.username } });
        const matchPass = await bcrypt.compare(req.body.password, req.user.password);
        if (!matchPass) {
            const error = new Error("Username or password does not match");
            res.status(500).json({ errorMessage: error.message, error: error });
            return;
        }
        next();
    } catch (error) {
        res.status(501).json({ errorMessage: error.message, error: error });
    }
};


    const tokenCheck = async (req, res, next) => {
        try {
            const token = req.header("Authorization")
            const decodedToken = await jwt.verify(token, process.env.SECRET)
            const user = await User.findOne ({where: {id: decodedToken.id}})

            if (!user) {
                throw new Error("Unable to authenticate user")
            }

            req.authUser = user;

            console.log(token)
            next();
            
        } catch (error) {
            res.status(501).json({errorMessage: error.message, error: error})
        }
    }



module.exports = {
    hashPass,
    comparePass,
    tokenCheck,
    tokenDeleteCheck
}