const router = require("express").Router();
const Events = require("./events-model.js");

  
router.get("/:id", (req, res, next) => {
    Events.findById(req.params.id)
      .then(event => {
        res.status(200).json(event);
      })
      .catch(next(err));
});

router.get("/group/:id", (req, res, next) => {
    Events.findByGroupId(req.params.id)
      .then(events => {
        res.status(200).json(events);
      })
      .catch(next(err));
});
  
router.put("/:id", (req, res, next) => {
    Events.update(req.params.id, req.body)
      .then(event => {
        res.status(200).json(event);
      })
      .catch(next);
});
  
  
router.delete("/:id", (req, res, next) => {
    Events.remove(req.params.id)
      .then(deletedEvent => {
        res.status(200).json(deletedEvent);
      })
      .catch(next);
});
  
module.exports = router;

