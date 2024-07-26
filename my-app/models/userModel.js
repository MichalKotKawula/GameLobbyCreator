const mongoose = require("mongoose");

const userSchema = {
     Email: String,
    Username: String, 
    Password: String,
    Status: String,
    UserGame: String,
    UserGroup: String,
    ClanName: String,
    Ratings: Number,
    RatedBy: Array


}




const User = mongoose.model("User", userSchema);

module.exports = User;