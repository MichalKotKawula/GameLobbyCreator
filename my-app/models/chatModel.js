const mongoose = require("mongoose");
const chatSchema = {
   Username: String,
   Message: String

}


const Chat = mongoose.model("Chat", chatSchema);
module.exports =  Chat;