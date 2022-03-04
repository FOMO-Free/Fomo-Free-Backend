const router = require("express").Router();
const Polls = require("./polls-model.js");

router.get("/:id", (req, res, next) => {
    Polls.findById(req.params.id)
      .then(user => {
        res.status(200).json(user);
      })
      .catch(next(err));
});


  

module.exports = router;