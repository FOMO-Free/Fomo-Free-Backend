const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Users = require("./users-model.js");
const Groups = require("../groups/groups-model")
const GroupUser = require("../usersgroupslink/usersgroupslink-model");



router.get("/:id", (req, res, next) => {
  Users.findById(req.params.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(next);
});



router.put("/:id", (req, res, next) => {
  Users.update(req.params.id, req.body)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(next);
});


router.delete("/:id", (req, res, next) => {
  Users.remove(req.params.id)
    .then(message => {
      res.status(200).json({message: message});
    })
    .catch(next);
});


router.get("/groups", (req, res, next) => {
  const token = jwt.decode(req.headers.authorization)
  GroupUser.findByUserId(token.subject)
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
    .catch(next);
});

module.exports = router;
