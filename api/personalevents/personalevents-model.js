const db = require("../../data/dbConfig");


const findByUserId = (user_id) => {
    return db("personalevents").select("id","what","start","end","affects free time").where("user_id", user_id);
};

const add = async (event) => {
    const [newEvent] = await db("personalevents").insert(event, "*");
    return newEvent;
};

const update = async (id, event) => {
    const [updatedEvent] = await db("personalevents").where("id", id).update(event, "*");
    return updatedEvent;
}

const remove = async (id) => {
    const [deletedEvent] = await db("personalevents").where("id",id).del("*");
    return `${deletedEvent.what} has been deleted`
}

module.exports = {
    findByUserId,
    update,
    add,
    remove
}