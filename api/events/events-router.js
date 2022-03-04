const router = require("express").Router();
const Events = require("./events-model.js");

  
router.get("/:id", (req, res, next) => {
    Events.findByName(req.params.id)
      .then(event => {
        res.status(200).json(event);
      })
      .catch(next);
});

router.get("/:id/all", (req,res,next) => {
    Events.findByGroup(req.params.id)
      .then(events => {
        events.forEach()
      })
})
  
  
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

