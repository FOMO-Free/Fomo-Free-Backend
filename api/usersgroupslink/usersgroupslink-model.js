const db = require("../../data/dbConfig");


const findByUserId = (id) => {
    return db("usersgroupslink").select("group_id").where("user_id", id);
  };

const findByGroupId = (id) => {
    return db("usersgroupslink").select("user_id").where("group_id", id);
}

const add = async (group_id,user_id) => {
    const [usergrouplink] = await db("usersgroupslink").insert({user_id:user_id,group_id:group_id},"*");
    const user = db("users").where("user_id",usergrouplink.user_id).first();
    const group = db("groups").where("group_id",usergrouplink.group_id).first();
    return {
        message:`${user.username} and ${group.group_name}`,
        group: group
    }
}

const remove = async (group_id, user_id) => {
    const [usergrouplink] = await db("usersgroupslink").where({user_id:user_id,group_id:group_id}).del("*");
    return `${usergrouplink} has been deleted`;
  };


  module.exports = {
    findByUserId,
    add,
    findByGroupId,
    remove,
};