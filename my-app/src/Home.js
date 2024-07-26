import React, { Component } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
export default class Home extends Component {
  constructor(props) {
    super(props);

    this.homeUser = {
      // user: document.getElementById("rUsername").value,
      user: [],
    };

    this.groups = {
      host: false,
      game: false,
      members: false,
      numberOfPlayers: false,
    };

    this.state = {
      loading: true,
      loadingM: true,
      person: [],
      person2: [],
      person3: [],
      person4: [],
      person5: [],
      person6: [],
      show: [false, false, false],
    };

    //handle game
    this.handleGame = this.handleGame.bind(this);
    this.handleGame2 = this.handleGame2.bind(this);
    this.handleGame3 = this.handleGame3.bind(this);
    //handle join
    //handle host
    this.handleHost = this.handleHost.bind(this);
    //leave group
    //handle join group
    //handle count
    //handle leave
    //display group
    //create group
    this.handleJoinMul = this.handleJoinMul.bind(this);
  }

  // homeUser = {
  //    user: none
  // };
  //
  handleHost = (event) => {
    // event.preventDefault();
    const updateMyGuy = {
      Username: localStorage.getItem('user'),
      UserGroup: localStorage.getItem('user'),
    };
    const newGroup = {
      Host: localStorage.getItem('user'),
      // Game: "",
      Members: localStorage.getItem('user'),
      NumberOfPlayers: 1,
    };
    if (updateMyGuy.Username){
    fetch("https://projectt490.herokuapp.com/groups")
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((groups) => {

      let alreadyReg = false;
      for (var i = 0; i < groups.length; i++) {
        if(groups[i].Host == updateMyGuy.Username){
          alreadyReg =true;
          break;           
        }

        for (let j = 0; j < groups[i].NumberOfPlayers; j++){
            if(groups[i].Members[j] ==updateMyGuy.Username){
              alreadyReg = true;
              break;
            }
        }

  } 
if (alreadyReg == false){
  alert("Created group");
  axios.post("https://projectt490.herokuapp.com/host", newGroup);
}else{
  alert("User Already in GROUP")
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

  //Get groups
  getGroup = () => {

    var USSname =localStorage.getItem("user");
    fetch("https://projectt490.herokuapp.com/groups")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((groups) => {
        console.log(groups);
        if(USSname){
        for(var i = 0; i < groups.length; i++){
        if (groups[i].Host == USSname|| groups[i].Members[1] ==USSname||groups[i].Members[2] ==USSname||groups[i].Members[3] ==USSname){
          this.setState({person: groups[i],  loadingM :false});
        }
        }
      }
        // this.setState({person: groups[0],person2: groups[1], person3: groups[2], loading :false});
        this.setState({person2: groups[0], person3: groups[1], person4: groups[2], person6: groups[3], person5: groups, loading :false});
          })
  };
  getUsr = () => {
    fetch("https://projectt490.herokuapp.com/login")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((users) => {
        console.log(users);
        this.setState({ user: users });

      });
  };
  //component Mount
  componentDidMount() {
    this.getGroup();
    this.getUsr();

    //Getting logged in username from localStorage
    const Musername = localStorage.getItem("user");
    this.setState({ Musername });
    console.log(Musername);
  }
 
  handleJoin = (event) => {
    this.handleJoinMul(this.state.person2.Host);
  };
  handleJoin2 = (event) => {
    this.handleJoinMul(this.state.person3.Host);  
  };
  handleJoin3 = (event) => {  
    this.handleJoinMul(this.state.person4.Host);    
  };
  handleJoin4 = (event) => { 
    this.handleJoinMul(this.state.person6.Host);
  };

  handleJoinMul = (hostt) => {

 // event.preventDefault();
 const updateMyGuy = {
  Username: localStorage.getItem("user"),
  Status: "online",
  // UserGame: "Game1",
  UserGroup: hostt,
};
const Groupp = {
  Host: hostt,
  //  document.getElementById("rUsername").value,
  // Game: "",
  Members: [],
  // document.getElementById("rUsername").value,
  NumberOfPlayers: 0,
};
if (updateMyGuy.Username){
fetch("https://projectt490.herokuapp.com/groups")
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
  })
  .then((groups) => {

    let alreadyReg = false;
    for (var i = 0; i < groups.length; i++) {
      if(groups[i].Host == updateMyGuy.Username){
        alreadyReg =true;
        break;           
      }

      for (let j = 0; j < groups[i].NumberOfPlayers; j++){
          if(groups[i].Members[j] ==updateMyGuy.Username){
            alreadyReg = true;
            break;
          }
      }
if(groups[i].Host == Groupp.Host){
  Groupp.Members = groups[i].Members;
  Groupp.Members[groups[i].NumberOfPlayers] = updateMyGuy.Username;
 
  Groupp.NumberOfPlayers = groups[i].NumberOfPlayers +1;
}
} 
if (alreadyReg == false){
  alert("Joined Group")
  axios.put('https://projectt490.herokuapp.com/updateGroup/' + Groupp.Host, Groupp);
}else{
alert("User Already in GROUP")
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
  handleGame1 =()=>{
    this.handleGame("Game1");  
  }
handleGame2 = ()=>{
  this.handleGame("Game2");  
}
handleGame3 =()=>{
  this.handleGame("Game3");  
}

  //  handle Game
  handleGame = (gmPass) => {
    const updateMyGuy = {
      Username:  localStorage.getItem("user"),
      Status: "online",
      UserGame: gmPass,
    };

    
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
          alert("Game Selected");
          axios.put(
            "https://projectt490.herokuapp.com/update/" + updateMyGuy.Username,
            updateMyGuy
          );
        } else {
        }
      });
  };

  //Handle leave Group
  handleLeave = (event) => {
    const updateMyGuy = {
      Username:  localStorage.getItem("user"),
      Status: "online",
       UserGame: "",
      UserGroup: "",
    };
    const deleteGrp = {
      Host: this.state.person.Host,
      Members: [],
    };
    const updateGrp ={
      Host: this.state.person.Host,
      Members:[],
      NumberOfPlayers:0
    }

    
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

    fetch("https://projectt490.herokuapp.com/groups")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else if (res.status == 500) {
          alert(res.statusText);
        }
      })
      .then((groups) => {
        let check = false;
        for (var i = 0; i < groups.length; i++) {
          if (groups[i].Host == updateMyGuy.Username) {
            check = true;
            break;
          }
        }
        if (check) {
          alert("Group Deleted");
          axios.delete(
            "https://projectt490.herokuapp.com/deleteGroup/" + deleteGrp.Host
          );
        } else {

          for(var i = 0; i < groups.length; i++){
            if (groups[i].Members[1] ==updateMyGuy.Username){
              updateGrp.Members =groups[i].Members;
              updateGrp.Members[1] =- updateMyGuy.Username;
              updateGrp.NumberOfPlayers = groups[i].NumberOfPlayers -1;
              alert("You left the Group")
              axios.put('https://projectt490.herokuapp.com/updateGroup/' + updateGrp.Host, updateGrp);
            }if (groups[i].Members[2] ==updateMyGuy.Username){
              updateGrp.Members =groups[i].Members;
              updateGrp.Members[2] =- updateMyGuy.Username;
              updateGrp.NumberOfPlayers = groups[i].NumberOfPlayers -1;
              alert("You left the Group")
              axios.put('https://projectt490.herokuapp.com/updateGroup/' + updateGrp.Host, updateGrp);
            }
            if (groups[i].Members[3] ==updateMyGuy.Username){
              updateGrp.Members =groups[i].Members;
              updateGrp.Members[3] =- updateMyGuy.Username;
              updateGrp.NumberOfPlayers = groups[i].NumberOfPlayers -1;
              alert("You left the Group")
              axios.put('https://projectt490.herokuapp.com/updateGroup/' + updateGrp.Host, updateGrp);
            }
            }
        }
      });
  };
 

  //Home component
  render() {


    let leaveBButton =<button
    type="button"
    class="btn btn-danger btn-sm"
    onClick={() => {this.showHide(1)
      this.handleLeave()}}
  >
    LEAVE
  </button>
    let message;
    let message1;
    if (!this.state.person3) {
      message = <div>Empty</div>;
      message1 = <div>0</div>;
    } else {
      message = <div>{this.state.person3.Host}</div>;
      message1 = <div>{this.state.person3.NumberOfPlayers}</div>;
    }

    let message2;
    let message3;
    if (!this.state.person2) {
      message2 = <div>Empty</div>;
      message3 = <div>0</div>;
    } else {
      message2 = <div>{this.state.person2.Host}</div>;
      message3 = <div>{this.state.person2.NumberOfPlayers}</div>;
    }
    let message4;
    let message5;
    if (!this.state.person4) {
      message4 = <div>Empty</div>;
      message5 = <div>0</div>;
    } else {
      message4 = <div>{this.state.person4.Host}</div>;
      message5 = <div>{this.state.person4.NumberOfPlayers}</div>;
    }

    let message6;
    let message7;
    if (!this.state.person6) {
      message6 = <div>Empty</div>;
      message7 = <div>0</div>;
    } else {
      message6 = <div>{this.state.person6.Host}</div>;
      message7 = <div>{this.state.person6.NumberOfPlayers}</div>;
    }

    let message33;
    let message44;
    let message55;
    
    for ( let i = 0; i < this.state.person.NumberOfPlayers; i ++){
      message33 = <div>{ this.state.person.Members[1]}</div>;
      message44 = <div>{ this.state.person.Members[2]} </div>;
      message55= <div>{ this.state.person.Members[3]} </div>;
    }
//     let groupIndex;
   
// const renderPlayerr = (player, index)=>{
//   groupIndex = index;
//   return (
//     <tr key={index}>
 
{/* <td>{index}</td> */}
{/* <tr>{player.Host.map((subItms, sIdx)=>{
  return (
    <tr key = {sIdx}>
      <td>{sIdx}</td>
  <td>{subItms} </td>
  <td>
                            <button
                              type="button"
                              class="btn btn-danger btn-sm"
                              onClick={() => {this.showHide(1)
                                this.handleLeave()}}
                            >
                              LEAVE
                            </button>
                          </td>
  </tr>
  
  )
  
})}</tr> */}

{/* <td>{index}</td>
<td>{player.Host}</td>
<td>
                            <button
                              type="button"
                              class="btn btn-danger btn-sm"
                              onClick={() => {this.showHide(1)
                                this.handleLeave()}}
                            >
                              LEAVE
                            </button>
                          </td>

    </tr>
  )
} */}
{/* <tr key={index}>
<td>{player.Members.map((option,i)=>
<td key={option.Members}> {option.Members}</td>
)}</td>
    </tr>
  ) */}
 
    
let YourGrp = <div>
         <table class="table table-dark table-hover">
                      <thead class="theadStyle">
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Player</th>
                          <th scope="col">Leave</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">1</th>
                          <td>{this.state.person.Host}</td>
                          <td>
                          {leaveBButton}
                          </td>
                        </tr>                 
                                  {this.state.person.NumberOfPlayers >1 && (
                        <tr>
                          <th scope="row">2</th>
                          <td>{message33}</td>

                          <td>
                          {leaveBButton}
                          </td>
                        </tr>
                                  )}
                        {this.state.person.NumberOfPlayers >2 && (
                        <tr>
                          <th scope="row">3</th>
                          <td>{message44}</td>

                          <td>
                          {leaveBButton}
                          </td>
                        </tr>
                        )}
                  {this.state.person.NumberOfPlayers >3 && (
                        <tr>
                          <th scope="row">4</th>
                          <td>{message55}</td>
                          <td>
                          {leaveBButton}
                          </td>
                        </tr>
                        )}
                      </tbody>
                    </table>
  </div>

    return (
      <div class="container mt-3 theHomepage">
        <div class="row text-white">
          <div class="lg col-md-12 widgetBlock-lrg rounded leftAligned shadow-lg p-3 mb-5">
            <p class="responsive-text-lrg">
              Welcome to our Seneca Capstone Project. Everything is under work
              atm.
            </p>
          </div>

          <div class="lg col-md-12 widgetBlock-Game rounded leftAligned shadow-lg p-3 mb-5">
            <h2>Select a Game</h2>

            <div class="container">
              <div class="row">
                <div id="selectGame">
                  <div class="row">
                    <div class="lg col-md-3 widgetBlock-very-sml moveLeft rounded shadow-lg p-3 mb-5">
                      <p>Game #1</p>
                      <button
                        onClick={() => {this.showHide(0)
                        this.handleGame1()}}
                        type="button"
                        class="btn btn-success btn-md"
                        id="game1Btn"
                      >
                        Select
                      </button>
                    </div>

                    <div class="lg col-md-3 offset-1 widgetBlock-very-sml moveLeft rounded shadow-lg p-3 mb-5">
                      <p>Game #2</p>
                      <button
                        onClick={() => {this.showHide(0)
                          this.handleGame2()}}
                        type="button"
                        class="btn btn-success btn-md"
                        id="game2Btn"
                      >
                        Select
                      </button>
                    </div>

                    <div class="lg col-md-3 offset-1 widgetBlock-very-sml moveLeft rounded shadow-lg p-3 mb-5">
                      <p>Game #3</p>
                      <button
                        onClick={() => {this.showHide(0)
                          this.handleGame1()}}
                        type="button"
                        class="btn btn-success btn-md"
                        id="game3Btn"
                      >
                        Select
                      </button>
                    </div>
                  </div>
                </div>
                <div class=" col-md-12">
   
                </div>
                {this.state.show[0] && (
                  <div id="selectHost" class="lg col-md-12">
                    <h2>Host or Look for group?</h2>
                    <button
                      onClick={() => {this.showHide(1)
                        this.handleHost()}}
                      type="button"
                      class="btn btn-success btn-lg"
                      id="hostBtn"
                    >
                      HOST
                    </button>
                  
                    <button
                      onClick={() => this.showHide(2)}
                      type="button"
                      class="btn btn-success btn-lg offset-1"
                      id="joinBtn"
                    >
                      JOIN
                    </button>
                  </div>
                )}

                { !this.state.loadingM &&(
                  <div class="hosting table-responsive">
                    <h2>Your Group</h2>
                  

{YourGrp}
                  </div>
                )}

                {this.state.show[2] && (
                  <div class="table-responsive gameTable">
                    <h2>Select a group</h2>
                    <table class="table table-dark table-hover">
                      <thead class="theadStyle">
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Host</th>
                          <th scope="col"># of Players</th>
                          <th scope="col">Join</th>
                        </tr>
                      </thead>
                      <tbody>
               
                        <tr>
                          <th scope="row">1</th>

                          <td>{message2}</td>
                          <td>{message3}</td>
                          <td>

                          
                            <button
                              type="button"
                              class="btn btn-success btn-sm"
              
                              onClick={() => {this.showHideBoth()
                                this.handleJoin()}}
                            >
                              JOIN
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">2</th>
                          <td> {message} </td>
                          <td> {message1} </td>
                          
                          <td>
                            {/* Handle Join2 */}
                            <button
                              type="button"
                              class="btn btn-success btn-sm"
                              // onClick={() => this.showHideBoth()}
                              onClick={() => {this.showHideBoth()
                                this.handleJoin2()}}
                            >
                              JOIN
                            </button>
                          </td>
                        </tr>


                        {this.state.person4&& ( <tr>
                          <th scope="row">3</th>
                          <td>{message4}</td>
                          <td>{message5}</td>

                          <td>
                      
                            <button
                              type="button"
                              class="btn btn-success btn-sm"
                           
                              onClick={() =>{this.showHideBoth()
                                this.handleJoin3()}
                            }
                            >
                              JOIN
                            </button>
                          </td>
                        </tr>
                        )}

                         {this.state.person6&& ( <tr>
                          <th scope="row">4</th>
                          <td>{message6}</td>
                          <td>{message7}</td>

                          <td>
                      
                            <button
                              type="button"
                              class="btn btn-success btn-sm"
                           
                              onClick={() =>{this.showHideBoth()
                                this.handleJoin4()}
                            }
                            >
                              JOIN
                            </button>
                          </td>
                        </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        
        </div>
      </div>
    );
  }
  showHide(num) {
    this.setState((prevState) => {
      const newItems = [...prevState.show];
      newItems[num] = !newItems[num];
      return { show: newItems };
    });
  }
  showHideBoth() {
    this.showHide(1);
    this.showHide(2);
  }
}

