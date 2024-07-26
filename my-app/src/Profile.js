import { render } from "@testing-library/react";

import React, { Component, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";



export default class Profile extends Component{
  
constructor(props){
  super(props);

  this.user = {
    username: localStorage.getItem("user"),
    ratings: 0
  }

  this.state ={
    username: "",
    ratings: 0,
    ready: false,
    rated: false,
    ratedby: []
  }

  this.upVote = this.upVote.bind(this);
  this.downVote = this.downVote.bind(this);

}

upVote = () =>{
  const updateRating = {
    Username:  this.state.username,
    Ratings: this.state.ratings + 1,
    RatedBy: []
  }

  if(updateRating.Username){
    updateRating.RatedBy[this.state.ratedby.length] = this.user.username;
    console.log(updateRating.RatedBy);
    axios.put('https://projectt490.herokuapp.com/update/' + updateRating.Username, updateRating);
    alert("User " + updateRating.Username +" has been rated up");
    window.location.reload();
  }
}

downVote = () =>{
  const updateRating = {
    Username:  this.state.username,
    Ratings: this.state.ratings - 1,
    RatedBy: this.state.ratedby
  }

  if(updateRating.Username){
    updateRating.RatedBy[this.state.ratedby.length] = this.user.username;
    console.log(updateRating.RatedBy);
    axios.put('https://projectt490.herokuapp.com/update/' + updateRating.Username, updateRating);
    alert("User " + updateRating.Username +" has been rated down");
    window.location.reload();
  }
}

componentDidMount(){
  fetch("https://projectt490.herokuapp.com/login").then(res => {
    if(res.ok){
      return res.json()
    } else if(res.status == 500){
      alert(res.statusText);
    }
  }).then(users =>{
    let search = window.location.pathname.substring(9);
    if(search != "" && search != this.user.username){ //this get "/Profile/[username]", substring make it only "[username]""
      for(var i = 0; i < users.length; i++){
        if(users[i].Username == search){
          this.setState({username: users[i].Username, ratings: users[i].Ratings, ratedby: users[i].RatedBy, ready: true});
          for(var j = 0; j < users[i].RatedBy.length; j++)
            if(users[i].RatedBy[j] == this.user.username){
              this.setState({rated: true});
              break;
            }
            //console.log("Found the searched person");
            console.log(users[i].RatedBy.length);
        }
      }
    } else{
      for(var i = 0; i < users.length; i++){
        if(users[i].Username == this.user.username){
          this.setState({username: users[i].Username, ratings: users[i].Ratings, ratedby: users[i].RatedBy, ready: true, rated: true});
          //console.log("Found your profile");
          
        }
      }
    }
    if(this.state.ratings == undefined){
      this.setState({ratings: 0});
    }
  })
}
  
  render(){


  return (
    <div class="container-fluid">
      {localStorage.getItem("logIn") && this.state.ready &&

        <div class="text-white">

          <div class="widgetBlock-account rounded leftAligned shadow-lg p-3 mb-5">
            <h1> {this.state.username}'s Profile</h1>

            <h2>Ratings: {this.state.ratings}</h2>

            <button onClick={() => this.upVote()}  disabled={this.state.rated}>Thumbs Up</button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={() => this.downVote()}  disabled={this.state.rated}>Thumbs Down</button>


            {/* <h1>Status:{this.props.loggedInStatus} </h1> */}

          </div>
      
        

  
      </div>
      }
    </div>
  );
}
}

