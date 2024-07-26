const mongoose = require("mongoose");
const groupSchema = {
    Host: String,
    Game: String, 
    Members: Array,
    NumberOfPlayers: Number
}


const Group = mongoose.model("Group", groupSchema);
module.exports =  Group;