const router = require("express").Router();
const Groups = require("./groups-model.js");

  
router.get("/:id", (req, res, next) => {
    Groups.findByName(req.params.id)
      .then(group => {
        res.status(200).json(group);
      })
      .catch(next(err));
});
  
  
router.put("/:id", (req, res, next) => {
    Groups.update(req.params.id, req.body)
      .then(group => {
        res.status(200).json(group);
      })
      .catch(next(err));
});
  
  
router.delete("/:id", (req, res, next) => {
    Groups.remove(req.params.id)
      .then(deletedGroup => {
        res.status(200).json(deletedGroup);
      })
      .catch(next(err));
});
  
module.exports = router;
  