const jwt = require("jsonwebtoken");


const Users = require("../users/users-model.js");
const Groups = require("../groups/groups-model");
const Events = require("../events/events-model");
const GroupUser = require("../usersgroupslink/usersgroupslink-model");

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

const checkIfUsernameExists = (req, res, next) => {
  
    Users.findByUsername(req.body.username)
      .then(savedUser => {
        if (savedUser) {
          next();
        } else {
          res.status(401).json("Invalid credentials");
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

const checkGroupExists = (req, res, next) => {
    Groups.findById(req.params.id)
        .then(group => {
            if(group){
                next()
            } else {
                res.status(401).json("Hmmm. Can't seem to find that group")
            }
        })
        .catch(next)
}

const checkLinkExists = (req, res, next) => {
    GroupUser.findLink(req.param.id,req.param.userid)
        .then(link => {
            if(link){
                next()
            }
            else {
                res.status(401).json("that user isnt in the group")
            }
        })
}

const checkAdmin = (req, res, next) => {
    let token = jwt.decode(req.headers.authorization);
    Groups.findById(req.params.id)
        .then(group => {
            if (group.creator != token.subject) {
                res.status(401).json("Sorry, you need to be the creator of the group")
            } else {
                next()
            }
        })
        .catch(next)
}

const makeToken = (user) => {
    const payload = {
        subject: user.id,
        username: user.username
    };
    const options = {
        expiresIn: "1d",
    };
    return jwt.sign(payload, process.env.JWT_SECRET, options);
};
  
  
const restricted = (req, res, next) => {
    const token = req.headers.authorization;
    const now = Math.floor(Date.now() / 1000)
    if (!token || jwt.decode(token).exp > now) {
        res.status(401).json("You need a valid token");
    } else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
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
    checkIfUsernameExists,
    checkGroupExists,
    checkLinkExists,
    checkAdmin,
    makeToken,
    restricted,
  };