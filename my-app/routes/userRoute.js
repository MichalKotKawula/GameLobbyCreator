const express = require("express");
const { db, updateOne } = require("../models/userModel");
const router = express.Router();
const User = require("../models/userModel");
const Group =  require("../models/groupModel");
const Clan =  require("../models/clanModel");
const Chat =  require("../models/chatModel");
//user register
router.route("/register").post((req, res) =>{
    const Email = req.body.Email;
    const Username = req.body.Username;
    const Password = req.body.Password;
    const Status = req.body.Status;
    const UserGame = req.body.UserGame;
    const UserGroup = req.body.UserGroup;
    const ClanName = req.body.ClanName;
    const Ratings = req.body.Ratings;
    const RatedBy = req.body.RatedBy;
    const newUser = new User({
        Email,
        Username,
        Password,
        Status,
        UserGame,
        UserGroup,
        ClanName,
        Ratings,
        RatedBy
    });

    newUser.save()
});

//group host
router.route("/host").post((req, res) =>{
    const Host = req.body.Host;
    const Game = req.body.Game;
    const Members = req.body.Members;
    const NumberOfPlayers = req.body.NumberOfPlayers;

    const newGroup = new Group({
        Host,
        Game,
        Members,
        NumberOfPlayers
    });

    newGroup.save()
});


//get all grouos
router.route("/groups").get((req, res) =>{
    Group.find()
        .then(foundGrp =>{
            res.json(foundGrp);
        })
});


//save chat
router.route("/saveMsg").post((req, res) =>{
    const Username = req.body.Username;
    const Message = req.body.Message;

    const newChat = new Chat({
        Username,
        Message,
    });

    newChat.save()
});

//display chat
router.route("/showMsg").get((req, res) =>{
    Chat.find()
        .then(Msg =>{
            res.json(Msg);
        })
})


//create clan
router.route("/createClan").post((req, res) =>{
    const Name = req.body.Name;
    const Leader = req.body.Leader;
    const Description = req.body.Description;
    const Game = req.body.Game;
    const Members = req.body.Members;
    const NumberOfPlayers = req.body.NumberOfPlayers;
    const MaxPeople = req.body.MaxPeople;
    const newClan = new Clan({
        Name,
        Leader,
        Description,
        Game,
        Members,
        NumberOfPlayers,
        MaxPeople,
    });

    newClan.save()
});

//get all clans
router.route("/clans").get((req, res) =>{
    Clan.find()
        .then(foundCln =>{
            res.json(foundCln);
        })
})


//update clan by leader
router.route("/updateClan/:leader").put ((req,res)=>{
    const myClan = {
    
        Description: req.body.Description,
        Game: req.body.Game, 
        Members: req.body.Members,
        NumberOfPlayers: req.body.NumberOfPlayers

    };
Clan.findOneAndUpdate({Leader: req.params.leader}, {$set: myClan}, (req,res, err)=>{
    if(!err){
        console.log("updated");
    }else{
        console.log("error");
    }
})

})

//delete clan by leader
router.route("/deleteClan/:leader").delete ((req,res)=>{
 
Clan.findOneAndDelete({Leader: req.params.leader}, (req,res, err)=>{
    if(!err){
        console.log("deleted");
    }else{
        console.log("error");
    }
})

})

//get user by id
router.route("/login/:id").get((req,res)=>{
User.findById(req.params.id)
.then(foudnBoy=>{
    res.json(foudnBoy)
}).catch(err=> next (err))

})

//update group by host
router.route("/updateGroup/:host").put ((req,res)=>{
    const myUser = {
    
        Game: req.body.Game,
        Members:req.body.Members,
        NumberOfPlayers:req.body.NumberOfPlayers,

    };
Group.findOneAndUpdate({Host: req.params.host}, {$set: myUser}, (req,res, err)=>{
    if(!err){
        console.log("updated");
    }else{
        console.log("error");
    }
})

})

//delete group
router.route("/deleteGroup/:host").delete ((req,res)=>{
    const myUser = {
    
        Game: req.body.Game,
        Members:req.body.Members,
        NumberOfPlayers:req.body.NumberOfPlayers,

    };
Group.findOneAndDelete({Host: req.params.host}, (req,res, err)=>{
    if(!err){
        console.log("deleted");
    }else{
        console.log("error");
    }
})

})

//update user by username
router.route("/update/:username").put ((req,res)=>{
    const myUser = {
        Email: req.body.Email,
        Password:req.body.Password,
        Status:req.body.Status,
        UserGame:req.body.UserGame,
        UserGroup:req.body.UserGroup,
        ClanName: req.body.ClanName,
        Ratings:req.body.Ratings,
        RatedBy: req.body.RatedBy
    };
User.findOneAndUpdate({Username: req.params.username}, {$set: myUser}, (req,res, err)=>{
    if(!err){
        console.log("updated");
    }else{
        console.log("error");
    }
})

})

//get all users
router.route("/login").get((req, res) =>{
    User.find()
        .then(foundUser =>{
            res.json(foundUser);
        })
})




module.exports = router;