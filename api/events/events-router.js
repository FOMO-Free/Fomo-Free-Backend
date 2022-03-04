const router = require("express").Router();
const Events = require("./events-model.js");

  
router.get("/:id", (req, res, next) => {
<<<<<<< HEAD
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
  
=======
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
>>>>>>> e41456e585e16241ba0214dc5e69111a9fb94862
  
router.put("/:id", (req, res, next) => {
    Events.update(req.params.id, req.body)
      .then(event => {
        res.status(200).json(event);
      })
<<<<<<< HEAD
      .catch(next);
});
  
  
=======
      .catch(next(err));
});
  
>>>>>>> e41456e585e16241ba0214dc5e69111a9fb94862
router.delete("/:id", (req, res, next) => {
    Events.remove(req.params.id)
      .then(deletedEvent => {
        res.status(200).json(deletedEvent);
      })
<<<<<<< HEAD
      .catch(next);
});
  
module.exports = router;

=======
      .catch(next(err));
});
  
module.exports = router;
>>>>>>> e41456e585e16241ba0214dc5e69111a9fb94862
