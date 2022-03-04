const db = require("../../data/dbConfig");


const findById = (id) => {
    return db("polls").select("id","created at","expiration","active","event_id").where("id", id).first();
};

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
    add,
    update,
    remove,
};