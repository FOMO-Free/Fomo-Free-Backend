const router = require("express").Router();
const GroupUser = require("./usersgroupslink-model.js");
const Users = require("../users/users-model")
const Groups = require("../groups/groups-model")



router.get("/:groupid", (req, res, next) => {
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
    .catch(next(err));
});


router.get("/:userid", (req, res, next) => {
  GroupUser.findByUserId(req.params.userid)
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
    .catch(next(err));
});

router.post("/:groupid/:userid", (req, res, next) => {
  Users.add(req.params.groupid,req.params.userid)
    .then(connection => {
      res.status(200).json(connection);
    })
    .catch(next(err));
});

router.delete("/:groupid/:userid", (req, res, next) => {
  GroupUser.remove(req.params.groupid,req.params.userid)
    .then(deletedConnection => {
      res.status(200).json(deletedConnection);
    })
    .catch(next(err));
});

module.exports = router;
