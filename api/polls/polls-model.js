const db = require("../../data/dbConfig");


const findById = (id) => {
    return db("polls").select("id","created at","expiration","active","event_id","voters").where("id", id).first();
};

const findByEventId = (id) => {
    return db("polls").select("id","created at","expiration","active","event_id","voters").where("event_id", id);
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
    add,
    update,
    remove,
};