const db = require("../../data/dbConfig");


const findByUserId = (id) => {
    return db("attending").select("event_id").where("user_id", id);
  };

const findByEventId = (id) => {
    return db("attending").select("user_id").where("event_id", id);
}

const findAttendance = (event_id,user_id) => {
    return db("attending").select("*").where({user_id:user_id,event_id:event_id}).first();
}

const add = async (event_id,user_id) => {
    const [attendance] = await db("usersgroupslink").insert({user_id:user_id,event_id:event_id},"*");
    const user = db("users").where("user_id",attendance.user_id).first();
    const event = db("events").where("event_id",attendance.event_id).first();
    return {
        message:`${user.username} and ${event.what}`
    }
}

const remove = async (event_id, user_id) => {
    const [attendance] = await db("usersgroupslink").where({user_id:user_id,event_id:event_id}).del("*");
    return `${attendance} has been deleted`;
  };


  module.exports = {
    findByUserId,
    add,
    findByEventId,
    findAttendance,
    remove,
};