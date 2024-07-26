import { render } from "@testing-library/react";

import React, { Component, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Modal.css";

export default class Modal extends Component{

  constructor(props) {
    super(props);

    this.user = {
      username: localStorage.getItem("user"),
    }
  
    this.state ={
      open: this.props.setOpenModal,
      username: this.props.nameSearch,
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
      Ratings: this.state.ratings,
      RatedBy: this.state.ratedby
    }
  
    if(updateRating.Username){
      let loop = new Promise((resolve) => {
        for(var i = 0; i< updateRating.RatedBy.length; i++){
          if(updateRating.RatedBy[i][0] == this.user.username){//if already rated;
            if(updateRating.RatedBy[i][1] == "positive"){ //if already rated and downvoted (1 -> 0)
              updateRating.RatedBy[i][1] = "neutral";
              updateRating.Ratings--; 
              alert("User " + updateRating.Username +" upvote have been cancelled.");
            } else if(updateRating.RatedBy[i][1] == "negative"){ // if already rated and downvoted (-1 -> 1)
              updateRating.RatedBy[i][1] = "positive";
              updateRating.Ratings = updateRating.Ratings + 2;
              alert("User " + updateRating.Username +" has been upvoted from downvote");
            } else{ // already rated but not voted either due to cancel or something else (0 -> 1)
              updateRating.RatedBy[i][1] = "positive";
              updateRating.Ratings++;
              alert("User " + updateRating.Username +" has been upvoted");
            }
            resolve(true);
            break;
          }
        }
        resolve(false);
      });
      
      loop.then((resolve)=>{ // by using promise, loop will complete first before this part start
        if(!resolve){
          updateRating.RatedBy[this.state.ratedby.length] = [this.user.username, "positive"];
          updateRating.Ratings++;
          alert("User " + updateRating.Username +" has been upvoted");
        }
        axios.put('https://projectt490.herokuapp.com/update/' + updateRating.Username, updateRating);
        this.setState({ratings: updateRating.Ratings, ratedby: updateRating.RatedBy});
      })
    }
  }
  
  downVote = () =>{
    //console.log(this.state.ratedby)
    const updateRating = {
      Username:  this.state.username,
      Ratings: this.state.ratings,
      RatedBy: this.state.ratedby
    }


    if(updateRating.Username){
      let loop = new Promise((resolve) => {
        for(var i = 0; i< updateRating.RatedBy.length; i++){
          if(updateRating.RatedBy[i][0] == this.user.username){//if already rated;
            if(updateRating.RatedBy[i][1] == "negative"){ //if already rated and downvoted (-1 -> 0)
              updateRating.RatedBy[i][1] = "neutral";
              updateRating.Ratings++; 
              alert("User " + updateRating.Username +" downvote have been cancelled.");
            } else if(updateRating.RatedBy[i][1] == "positive"){ // if already rated and upvoted (1 -> -1)
              updateRating.RatedBy[i][1] = "negative";
              updateRating.Ratings = updateRating.Ratings - 2;
              alert("User " + updateRating.Username +" has been downvoted from upvote");
            } else{ // already rated but not voted either due to cancel or something else (0 -> -1)
              updateRating.RatedBy[i][1] = "negative";
              updateRating.Ratings--;
              alert("User " + updateRating.Username +" has been downvoted");
            }
            resolve(true);
            break;
          }
        }
        resolve(false);
      });
      
      loop.then((resolve)=>{ // by using promise, loop will complete first before this part start
        if(!resolve){
          updateRating.RatedBy[this.state.ratedby.length] = [this.user.username, "negative"];
          updateRating.Ratings--;
          alert("User " + updateRating.Username +" has been downvoted");
        }
        axios.put('https://projectt490.herokuapp.com/update/' + updateRating.Username, updateRating);
        this.setState({ratings: updateRating.Ratings, ratedby: updateRating.RatedBy});
      })
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
      let search = this.state.username;
      if(search != "" && search != this.user.username){ 
        for(var i = 0; i < users.length; i++){
          if(users[i].Username == search){
            this.setState({ratings: users[i].Ratings, ratedby: users[i].RatedBy, ready: true});
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
            this.setState({ratings: users[i].Ratings, ratedby: users[i].RatedBy, ready: true, rated: true});
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
    return(
      <div className="modalBackground">
        {localStorage.getItem("logIn") && this.state.ready &&
        <div className="modalContainer">
          <div className="titleCloseBtn">
            <button
              onClick={() => {
                window.location.reload();
              }}
            >
              X
            </button>
          </div>
          <div className="title">
            <h1>{this.state.username}</h1>
          </div>
          <div className="body">
            <p>Ratings: {this.state.ratings}</p>
          </div>
          <div className="footer">
            <button 
              onClick={() =>{this.upVote()}}
              disabled = {this.state.rated}
              >
                Upvote
            </button>
            <button
              onClick={() =>{this.downVote()}}
              disabled = {this.state.rated}
              id="cancelBtn"
              >
                Downvote
            </button>
          </div>
        </div>
      }
      </div>
    )
  };

}