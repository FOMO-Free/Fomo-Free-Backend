const router = require("express").Router();
const GroupUser = require("./usersgroupslink-model.js");
const Users = require("../users/users-model")
const Groups = require("../groups/groups-model")
const {checkAdmin} = require("../middleware/middleware")
const jwt = require("jsonwebtoken");



router.get("/group/:groupid", (req, res, next) => {
  GroupUser.findByGroupId(req.params.groupid)
    .then(connections => {
      const users = [];
      connections.forEach(id => {
        Users.findById(id)
          .then(user => {
            users.push(user)
            if(users.length === connections.length){
              res.status(200).json(users);
            }
          })
      })
    })
    .catch(next());
});


router.get("/user", (req, res, next) => {
  const token = req.headers.authorization;
  const userid = jwt.decode(token).subject
  GroupUser.findByUserId(userid)
    .then(connections => {
      const groups = [];
      connections.forEach(id => {
        Groups.findById(id)
          .then(group => {
            groups.push(group)
            if(groups.length === connections.length){
              res.status(200).json(groups);
            }
          })
      })
    })
    .catch(next());
});

router.post("/:groupid/:userid", (req, res, next) => {
  Users.add(req.params.groupid,req.params.userid)
    .then(connection => {
      res.status(200).json(connection);
    })
    .catch(next());
});

router.delete("/:groupid/:userid",checkAdmin, (req, res, next) => {
  GroupUser.remove(req.params.groupid,req.params.userid)
    .then(deletedConnection => {
      res.status(200).json(deletedConnection);
    })
    .catch(next());
});

module.exports = router;
