const mongoose = require("mongoose");
const clanSchema = {
    Name: String,
    Leader: String,
    Description: String,
    Game: String, 
    Members: Array,
    NumberOfPlayers: Number,
    MaxPeople: Number

}


const Clan = mongoose.model("Clan", clanSchema);
module.exports =  Clan;

