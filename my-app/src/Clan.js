

import React, { Component,  } from 'react';
import axios from "axios";
import "./Clan.css";
import Modal from "./Components/Modal";

//Clan component (after they are logged in)
export default class Clan extends Component {
  
  constructor(props) {
    super(props);

    this.clanUser = {
      user: [],
    }

    this.clan = {
      leader: false,
      game: false,
      members: false,
      numberOfUsers: false,
    }

    this.state = {
      loadingM: true,
      showEdit: false,
      notiPass: false,
      wantEdit: false,
      clan: [],
      clan2: [],
      clan3: [],
      clan4: [],
      clan5: [],
      clan6: [],
      openModal: false,
      name: null,
    };

    
    this.handleCreate = this.handleCreate.bind(this);
    this.handlemyEdChange = this.handlemyEdChange.bind(this);
    this.handleNotiSending = this.handleNotiSending.bind(this);
  }
  handlemyEdChange = (event) =>{
    const updClan = {
    
      Leader: localStorage.getItem('user'),
      Description: document.getElementById("newDescription").value,
 
    };

        alert("Updated Description")
        axios.put('https://projectt490.herokuapp.com/updateClan/' + updClan.Leader, updClan);
     
  }

  handleNotiSending = (event) =>{
    const updClan = {
    
      Leader: localStorage.getItem('user'),
      NotificationDesc: document.getElementById("newNoti").value,
 
    };

        alert("Sent Notification!")
        axios.put('https://projectt490.herokuapp.com/updateClan/' + updClan.Leader, updClan);
     
  }

//create clan
handleCreate = (event) => {
  event.preventDefault();
  const updateMyGuy = {
    Username: localStorage.getItem('user'),
    ClanName: document.getElementById("rName").value,
  };
  const newClan = {
    Name: document.getElementById("rName").value,
    Leader: localStorage.getItem('user'),
    Description: document.getElementById("rDescription").value,

    Game: document.getElementById("FormCustomSelect").value,   
    MaxPeople:document.getElementById("rMaxPeople").value,   
    Members: localStorage.getItem('user'),
    NumberOfPlayers: 1,
    NotificationDesc: "",
  };
  localStorage.setItem('clan', updateMyGuy.ClanName);

  if (updateMyGuy.Username){
  fetch("https://projectt490.herokuapp.com/clans")
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
  })
  .then((clans) => {


    let alreadyReg = false;
    for (var i = 0; i < clans.length; i++) {
      if(clans[i].Leader == updateMyGuy.Username){
        alreadyReg =true;
        break;           
      }

      for (let j = 0; j < clans[i].NumberOfPlayers; j++){
          if(clans[i].Members[j] ==updateMyGuy.Username){
            alreadyReg = true;
            break;
          }
      }

} 
if (alreadyReg == false){
alert("Created Clan");
axios.post("https://projectt490.herokuapp.com/createClan", newClan);
}else{
alert("User Already in Clan")
}
})

  fetch("https://projectt490.herokuapp.com/login")
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else if (res.status == 500) {
        alert(res.statusText);
      }
    })
    .then((users) => {
      let check = false;
      for (var i = 0; i < users.length; i++) {
        if (users[i].Username == updateMyGuy.Username) {
          check = true;
          break;
        }
      }
      if (check) {
        axios.put(
          "https://projectt490.herokuapp.com/update/" + updateMyGuy.Username,
          updateMyGuy
        );
      } else {
      }
    });
  }
};




  //get Clans
  getClan = () => {

    var USSname =localStorage.getItem("user");
    fetch("https://projectt490.herokuapp.com/clans")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((clans) => {
        console.log(clans);
        if(USSname){
        for(var i = 0; i < clans.length; i++){
        if (clans[i].Leader == USSname|| clans[i].Members[1] ==USSname||clans[i].Members[2] ==USSname||clans[i].Members[3] ==USSname){
          this.setState({clan: clans[i],  loadingM :false});
        }
        if (clans[i].Leader == USSname){
          this.setState({ showEdit: true, notiPass: true});
        }
        }
      }
        // this.setState({person: clans[0],person2: clans[1], person3: clans[2], loading :false});
        this.setState({clan2: clans[0], clan3: clans[1], clan4: clans[2], clan5: clans[3], clan6: clans, loading :false});
          })
  };

  componentDidMount() {
    this.getClan();
  }



  //handleJoinClan
  handleJoin = (event) => {
    this.handleJoinCln(this.state.clan2.Leader);
  };
  handleJoin2 = (event) => {
    this.handleJoinCln(this.state.clan3.Leader);  
  };
  handleJoin3 = (event) => {  
    this.handleJoinCln(this.state.clan4.Leader);    
  };
  handleJoin4 = (event) => { 
    this.handleJoinCln(this.state.clan5.Leader);
  };


  //join clan
  handleJoinCln = (leaderrr) => {

    // event.preventDefault();
    const updateMyGuy = {
     Username: localStorage.getItem("user"),
     Status: "online",
     // UserGame: "Game1",
    //  UserGroup: leaderrr,
    ClanName: "",
   };
   const Clann = {
     Leader: leaderrr,
     //  document.getElementById("rUsername").value,
     // Game: "",
     Members: [],
     // document.getElementById("rUsername").value,
     NumberOfPlayers: 0,
   };
   if (updateMyGuy.Username){
   fetch("https://projectt490.herokuapp.com/clans")
     .then((res) => {
       if (res.ok) {
         return res.json();
       }
     })
     .then((clans) => {

   let maxCap = false;
   let numbrr = 0;
   for (var i = 0; i < clans.length; i++) {
    if(clans[i].MaxPeople == clans[i].NumberOfPlayers){
      maxCap =true;
      numbrr = clans[i].MaxPeople;
      break;           
    }
  }

       let alreadyReg = false;
       for (var i = 0; i < clans.length; i++) {
         if(clans[i].Leader == updateMyGuy.Username){
           alreadyReg =true;
           break;           
         }
   
         for (let j = 0; j < clans[i].NumberOfPlayers; j++){
             if(clans[i].Members[j] ==updateMyGuy.Username){
               alreadyReg = true;
               break;
             }
         }
   if(clans[i].Leader == Clann.Leader){
     Clann.Members = clans[i].Members;
     Clann.Members[clans[i].NumberOfPlayers] = updateMyGuy.Username;
     updateMyGuy.ClanName = clans[i].Name;
     localStorage.setItem('clan', updateMyGuy.ClanName);
     console.log(localStorage.getItem('clan'));
     Clann.NumberOfPlayers = clans[i].NumberOfPlayers +1;
   }
   } 


   
   if (alreadyReg == false &&maxCap == false ){
     alert("Joined Clan")
     axios.put('https://projectt490.herokuapp.com/updateClan/' + Clann.Leader, Clann);
   }else if (maxCap == true){
    alert("Max Clan Capacity of: " + numbrr)
   }else{
    alert("User Already in Clan")
   }
   })
   
     
   fetch("https://projectt490.herokuapp.com/login")
     .then((res) => {
       if (res.ok) {
         return res.json();
       } else if (res.status == 500) {
         alert(res.statusText);
       }
     })
     .then((users) => {
       let check = false;
       for (var i = 0; i < users.length; i++) {
         if (users[i].Username == updateMyGuy.Username) {
           check = true;
           break;
         }
       }
       if (check) {
         axios.put(
           "https://projectt490.herokuapp.com/update/" + updateMyGuy.Username,
           updateMyGuy
         );
       } else {
       }
     });
   }
     }

//Handle leave Clan
handleLeave = (event) => {
  const updateMyGuy = {
    Username:  localStorage.getItem("user"),
    Status: "online",
     UserGame: "",
    UserGroup: "",
    ClanName: "",
  };
  const deleteCln = {
    Leader: this.state.clan.Leader,
    Members: [],
  };
  const updateCln ={
    Leader: this.state.clan.Leader,
    Members:[],
    NumberOfPlayers:0
  }

  localStorage.setItem('clan', updateMyGuy.ClanName);
  console.log(localStorage.getItem('clan'));
  fetch("https://projectt490.herokuapp.com/login")
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else if (res.status == 500) {
        alert(res.statusText);
      }
    })
    .then((users) => {
      let check = false;
      for (var i = 0; i < users.length; i++) {
        if (users[i].Username == updateMyGuy.Username) {
          check = true;
          break;
        }
      }
      if (check) {
        axios.put(
          "https://projectt490.herokuapp.com/update/" + updateMyGuy.Username,updateMyGuy);
      } else {
      }
    });

  fetch("https://projectt490.herokuapp.com/clans")
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else if (res.status == 500) {
        alert(res.statusText);
      }
    })
    .then((clans) => {
      let check = false;
      for (var i = 0; i < clans.length; i++) {
        if (clans[i].Leader == updateMyGuy.Username) {
          check = true;
          break;
        }
      }
      if (check) {
        alert("Clan Deleted");
        axios.delete(
          "https://projectt490.herokuapp.com/deleteClan/" + deleteCln.Leader
        );
      } else {

        for(var i = 0; i < clans.length; i++){
          if (clans[i].Members[1] ==updateMyGuy.Username){
            updateCln.Members =clans[i].Members;
            updateCln.Members[1] =- updateMyGuy.Username;
            updateCln.NumberOfPlayers = clans[i].NumberOfPlayers -1;
            alert("You left the Clan")
            axios.put('https://projectt490.herokuapp.com/updateClan/' + updateCln.Leader, updateCln);
          }if (clans[i].Members[2] ==updateMyGuy.Username){
            updateCln.Members =clans[i].Members;
            updateCln.Members[2] =- updateMyGuy.Username;
            updateCln.NumberOfPlayers = clans[i].NumberOfPlayers -1;
            alert("You left the Clan")
            axios.put('https://projectt490.herokuapp.com/updateClan/' + updateCln.Leader, updateCln);
          }
          if (clans[i].Members[3] ==updateMyGuy.Username){
            updateCln.Members =clans[i].Members;
            updateCln.Members[3] =- updateMyGuy.Username;
            updateCln.NumberOfPlayers = clans[i].NumberOfPlayers -1;
            alert("You left the Clan")
            axios.put('https://projectt490.herokuapp.com/updateClan/' + updateCln.Leader, updateCln);
          }
          }
      }
    });
};


  //  handle Edit

  handleEdit=()=>{

    if (this.state.wantEdit == false){
    this.setState({wantEdit: true})
    }else{
      this.setState({wantEdit: false})
    }

  }
  handleNotiSend=()=>{

    if (this.state.wantNoti == false){
    this.setState({wantNoti: true})
    }else{
      this.setState({wantNoti: false})
    }

  }
  

  openProfile=(namePeek)=>{
    //let profile = window.location.href;
    //profile = profile.substring(0, profile.length - 4);
    //profile = profile + "Profile/" + name;
    //window.open(profile,"","width=600,height=400")
    this.setState({openModal: true, name: namePeek}); 
  }
  

  render() {
    //Check if the user is logged in
    let loggedIn = localStorage.getItem("logIn")
    //alert(loggedIn);


// if (this.state.openModal){
// localStorage.setItem("ChatRend", true)
// }else{
//   localStorage.setItem("ChatRend", false)
// }

    let message33;
    let message44;
    let message55;
    let message66;
    
    for ( let i = 0; i < this.state.clan.NumberOfPlayers; i ++){
      message33 = <div>{ this.state.clan.Members[1]}</div>;
      message44 = <div>{ this.state.clan.Members[2]} </div>;
      message55= <div>{ this.state.clan.Members[3]} </div>;
      message66=<div>{ this.state.clan.Members[4]} </div>;
    }
    
    return(
      
      <div>
        
        {loggedIn && !this.state.loadingM? (
          
          <div class="container-fluid">
             <div id= "bingo">
             {this.state.notiPass&&(
 <button   id="editbtt" 
 class="btn btn-info btn-sm topAligned" 
 onClick={() => this.handleNotiSend()}
 >Edit</button>

 )}


{this.state.wantNoti&&(

<div id="handlingbox">
<form onSubmit={this.handleNotiSending }   >

  <p ><input  type="text" id="newNoti" name="newNoti" placeholder="Enter Notification"  size ="10"/></p>

  <input type="submit"  class="btn btn-success btn-sm" id="Create" value="save" />
</form>
</div>
)}

 <p id= "noti">Notification</p>
 <p id="notitext">
 {this.state.clan.NotificationDesc}
 </p>
</div>
          <div class="text-white">
            <div class="widgetBlock-account rounded leftAligned shadow-lg p-3 mb-5">
         
              <h2>{this.state.clan.Name}</h2>
              <h3>{this.state.clan.Leader}</h3>

              
<div id="lines">
              <p id = "myblk">
               {this.state.clan.Description}
               
              </p>


              
              {this.state.showEdit&&(
              <button id ="myblk2" 
                              type="button"
                              class="btn btn-info btn-sm"
                              onClick={() => this.handleEdit()}
                              // onClick={() => {this.showHideBoth()
                              //   this.handleJoin2()}}
                            >
                     Edit
                            </button>
                             )}
             </div>
             {this.state.wantEdit&&(
             <div class="lg col-md-12 widgetBlock-small rounded leftAligned shadow-lg p-2 mb-4">
            <form onSubmit={this.handlemyEdChange }   >

              <p ><input  type="text" id="newDescription" name="newDescription" placeholder="Enter New Description" size ="30"/></p>

              <input type="submit"  class="btn btn-success btn-sm" id="Create" value="save" />
            </form>
          </div>
             )}
              <br></br>
              <h2>Clan Member List</h2>
              <table class="table table-dark table-hover">
                <thead class="theadStyle">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Player</th>
                    <th scope="col">Game of Choice</th>
                  </tr>
                </thead>
                <tbody>
                  <tr onClick={() =>{this.openProfile(this.state.clan.Leader)}}>
                    <th scope="row">1</th>
                    <td>{this.state.clan.Leader}</td>
                    <td>{this.state.clan.Game}</td>
                  </tr>
                  {this.state.clan.NumberOfPlayers >1 && (
                  <tr onClick={() =>{this.openProfile(this.state.clan.Members[1])}}>
                    <th scope="row">2</th>
                    <td>{message33}</td>
                    <td>{this.state.clan.Game}</td>
                  </tr>
                  )}
                    {this.state.clan.NumberOfPlayers >2 && (
                  <tr onClick={() =>{this.openProfile(this.state.clan.Members[2])}}>
                    <th scope="row">3</th>
                    <td>{message44}</td>
                    <td>{this.state.clan.Game}</td>
                  </tr>
                  )}
                {this.state.clan.NumberOfPlayers >3 && (
                  <tr onClick={() =>{this.openProfile(this.state.clan.Members[3])}}>
                    <th scope="row">4</th>
                    <td>{message55}</td>
                    <td>{this.state.clan.Game}</td>
                  </tr>
                  )}
                    {this.state.clan.NumberOfPlayers >4 && (
                  <tr onClick={() =>{this.openProfile(this.state.clan.Members[4])}}>
                    <th scope="row">5</th>
                    <td>{message66}</td>
                    <td>{this.state.clan.Game}</td>
                  </tr>
                  )}
                    
                </tbody>
              </table>

              <button type="button" class="btn btn-danger btn-sm"
              onClick={() => {this.handleLeave()}}
              >LEAVE CLAN</button>

            </div>
          </div>
     
          {this.state.openModal  &&<Modal setOpenModal={this.state.openModal} nameSearch={this.state.name} />}
         
        </div>
        ) : (
          <div class="container-fluid">
            <div class="text-white">
              <div class="widgetBlock-account rounded leftAligned shadow-lg p-3 mb-5">
                <h2>Clan List</h2>
                <p>
                  Browse the list below and join a clan that interests you.
                </p>

                <br></br>
                <h2>Clans</h2>
                <table class="table table-dark table-hover">
                  <thead class="theadStyle">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">CLAN NAME</th>
                      <th scope="col">Game of Choice</th>
                      <th scope="col">Number of Members</th>
                      <th scope="col">Join</th>
                    </tr>
                  </thead>
                  <tbody>
                  {this.state.clan2&& (
                    <tr>
                      <th scope="row">1</th>
                      <td>{this.state.clan2.Name}</td>
                      <td>{this.state.clan2.Game}</td>
                      <td>{this.state.clan2.NumberOfPlayers}</td>
                      <td>

                          
<button type="button" class="btn btn-success btn-sm"  
onClick={() => {this.handleJoin()}}
>
  JOIN
</button>
</td>
                    </tr>
                  )}
                    {this.state.clan3&& (    <tr>
                      <th scope="row">2</th>
                      <td>{this.state.clan3.Name}</td>
                      <td>{this.state.clan3.Game}</td>
                      <td>{this.state.clan3.NumberOfPlayers}</td>
                      <td>

                          
<button type="button" class="btn btn-success btn-sm"
  onClick={() => {this.handleJoin2()}}
>
  JOIN
</button>
</td>
                    </tr>
                    )}
                 {this.state.clan4&& (   <tr>
                      <th scope="row">3</th>
                      <td>{this.state.clan4.Name}</td>
                      <td>{this.state.clan4.Game}</td>
                      <td>{this.state.clan4.NumberOfPlayers}</td>
                      <td>                          
<button type="button"class="btn btn-success btn-sm"
  onClick={() => {this.handleJoin3()}}
>
  JOIN
</button>
                  </td>
                    </tr>
                 )}
                  </tbody>
                </table>


                {loggedIn &&(
                <div class="lg col-md-12 widgetBlock-lrg rounded leftAligned shadow-lg p-3 mb-5">
            <form onSubmit={this.handleCreate }   >
              <h2>Create Clan!</h2>
<br/>
              <p><input type="text" id="rName" name="Name"  placeholder="Clan Name" size ="25"/></p>

              <p ><input  type="text" id="rDescription" name="Description" placeholder="Description" size ="30"/></p>
              <p ><input  type="text" id="rMaxPeople" name="rMaxPeople" placeholder="Maximum Number of People" size ="25"/></p>
              <select class="custom-select mr-sm-2" id="FormCustomSelect">
        <option selected>Choose Game</option>
        <option value="Game1">Game1</option>
        <option value="Game2">Game2</option>
        <option value="Game3">Game3</option>
      </select>
      <br/>
      <br/>
  
              <input class="btn btn-success btn-md" type="submit" id="Create" value="Create" />
            </form>
          </div>
                )}
              </div>

              
            </div>
        </div>
        )}

        
      </div>
       
    );
  }
  
}