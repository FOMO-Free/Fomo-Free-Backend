const jwt = require("jsonwebtoken");


const Users = require("../users/users-model.js");
const Groups = require("../groups/groups-model");
const Events = require("../events/events-model");

const checkUniqueUsername = (req, res, next) => {
    let user = req.body;

    Users.findByUsername(user.username)
        .then(existingUser => {
        if (existingUser) {
            res.status(401).json("Username already exists");
        } else {
            next();
        }
        })
        .catch(next);
};

const checkUniqueEmail = (req, res, next) => {
    let user = req.body;

    Users.findByEmail(user.email)
        .then(existingUser => {
        if(existingUser) {
            res.status(401).json("Email already exists");
        } else {
            next()
        }
        })
        .catch(next)
}

const checkRegistrationFields = (req, res, next) => {
    let user = req.body;
    if (!user.username || !user.password || !user.email) {
        res.status(401).json("All fields are required");
    } else {
        next();
    }
};

const makeToken = (user) => {
    const payload = {
        subject: user.user_id,
        username: user.username,
        email: user.email,
    };
    const options = {
        expiresIn: "1d",
    };
    return jwt.sign(payload, process.env.JWT_SECRET, options);
};
  
  
const restricted = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        res.status(401).json("A token is required");
    } else {
        jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
        if (err) {
            res.status(403).json("Token is invalid " + err.message);
        } else {
            req.decodedToken = decodedToken;
            next();
        }
        });
    }
};



module.exports = {
    checkRegistrationFields,
    checkUniqueUsername,
    checkUniqueEmail,
    makeToken,
    restricted,
  };