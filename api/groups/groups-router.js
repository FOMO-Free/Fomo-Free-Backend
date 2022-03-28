const router = require("express").Router();
const Groups = require("./groups-model");
const GroupUser = require("../usersgroupslink/usersgroupslink-model");
const Users = require("../users/users-model")
const Attendings = require("../attending/attending-model")
const PersonalEvents = require("../personalevents/personalevents-model")
const {checkGroupExists, checkAdmin, checkLinkExists} = require("../middleware/middleware")
  
router.get("/:id", (req, res, next) => {
    Groups.findById(req.params.id)
      .then(group => {
        res.status(200).json(group);
      })
      .catch(next);
});
  
  
router.put("/:id", (req, res, next) => {
    Groups.update(req.params.id, req.body)
      .then(group => {
        res.status(200).json(group);
      })
      .catch(next);
});

router.get("/:id/availability", (req,res,next) => {
    const user_events = {}
    GroupUser.findByGroupId(req.params.id)
      .then(users => {
        users.forEach(user => {
          let eventtimes = []
          Attendings.findByUserId(user.id)
            .then(events => {
              events.forEach(event => {
                eventtimes.push([event.starttime,event.endtime])
              })
              PersonalEvents.findByUserId(user.id)
                .then(events => {
                  events.forEach(event => {
                    eventtimes.push([event.starttime,event.endtime])
                  })
                  user_events[user.id] = eventtimes
                })
                .catch(next);
            })
            .catch(next);
        })
      })
      .catch(next);
})

router.get("/:id/users", (req, res, next) => {
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
    .catch(next);
})

router.post("/", (req, res, next) => {
  Groups.add(req.body)
    .then(group => {
      res.status(200).json({message: `${group} has been added`});
    })
    .catch(next)
})

router.delete("/:id/:userid/", checkGroupExists, checkLinkExists, checkAdmin, (req,res,next) => {
    GroupUser.remove(req.param.id,req.param.userid)
      .then(message => {
        res.status(200).json({message: message});
      })
      .catch(next);
})
  
router.delete("/:id", checkGroupExists, checkAdmin, (req, res, next) => {
    Groups.remove(req.params.id)
      .then(deletedGroup => {
        res.status(200).json(deletedGroup);
      })
      .catch(next);
});
  
module.exports = router;
  