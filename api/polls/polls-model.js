const db = require("../../data/dbConfig");


const findById = (id) => {
    return db("polls").select("id","created at","expiration","active","event_id").where("id", id).first();
};

<<<<<<< HEAD
const findByEvent = (id) => {
    return db("events").select("id","what","when","where","poll").where("group_id", id);
}

const add = async (event) => {
    const [newEvent] = await db("events").insert(event, "*");
    return newEvent;
};

const update = async (id, event) => {
    const [updatednewEvent] = await db("events").where("id", id).update(event, "*");
    return updatednewEvent;
};

const remove = async (id) => {
    const [deletedEvent] = await db("groups").where("id", id).del("*");
    return `${deletedEvent.group_name} has been deleted`;
};

module.exports = {
    findById,
    findByEvent,
=======
const findByEventId = (id) => {
    return db("polls").select("id","created at","expiration","active","event_id").where("event_id", id);
};

const add = async (poll) => {
    const [newPoll] = await db("polls").insert(poll, "*");
    return newPoll;
};
  
const update = async (id, poll) => {
    const [updatedPoll] = await db("polls").where("id", id).update(poll, "*");
    return updatedPoll;
};
  
const remove = async (id) => {
    const [deletedPoll] = await db("polls").where("id", id).del("*");
    return `${deletedPoll.what} has been deleted`;
};


module.exports = {
    findById,
    findByEventId,
>>>>>>> e41456e585e16241ba0214dc5e69111a9fb94862
    add,
    update,
    remove,
};