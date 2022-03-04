const router = require("express").Router();
const Users = require("./users-model.js");



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
    .then(deletedUser => {
      res.status(200).json(deletedUser);
    })
    .catch(next);
});

module.exports = router;
