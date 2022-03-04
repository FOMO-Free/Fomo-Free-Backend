const db = require("../../data/dbConfig");


const findById = (id) => {
    return db("events").select("id","what","when","where","poll","group_id").where("id", id).first();
};

const findByGroupId = (id) => {
    return db("events").select("id","what","when","where","poll").where("group_id", id);
};

const add = async (event) => {
    const [newEvent] = await db("events").insert(event, "*");
    return newEvent;
};
  
const update = async (id, event) => {
    const [updatedEvent] = await db("events").where("id", id).update(event, "*");
    return updatedEvent;
};
  
const remove = async (id) => {
    const [deletedEvent] = await db("events").where("id", id).del("*");
    return `${deletedEvent.what} has been deleted`;
};


module.exports = {
    findById,
    findByGroupId,
    add,
    update,
    remove,
};