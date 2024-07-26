

import "./App.css";
import {
  Routes,
  Route,
  Router,
  Switch,
  BrowserRouter,
  Link,
} from "react-router-dom";
import React, { useEffect, Component, useState } from "react";
import axios from "axios";
import { Widget, addResponseMessage } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";

//Components
import Home from "./Home";
import Account from "./Account";
import Login from "./Login";
import NotFound from "./NotFound";
import Profile from "./Profile";
import Clan from "./Clan";
import ProtectedRoute from "./ProtectedRoute";


//This is a hook we created to reduce some of the bloat we get with watching inputs for changes.
import useInput from './useInput';
//Lets us import PubNub for our chat infrastructure capabailites.
import PubNub from 'pubnub';
//Material UI Components
import {Card, CardActions, CardContent,List, ListItem,Button,Typography,Input} from '@material-ui/core';

function App() {
  //Set a default channel incase someone navigates to the base url without
  //specificfying a channel name parameter.
  let defaultChannel = "Global";
  //Access the parameters provided in the URL
  let query = window.location.search.substring(1);
  let params = query.split("&");
  for(let i = 0; i < params.length;i++){
    var pair = params[i].split("=");
    //If the user input a channel then the default channel is now set
    //If not, we still navigate to the default channel.
    if(pair[0] === "channel" && pair[1] !== ""){
      defaultChannel = decodeURI(pair[1]);
    }
  }



  //Set the states using useState hook,
  //We have our messages, a message adding buffer, our channel,the username, and
  //temp channel and message using the useInput hook. We access what the
  //user is currently typing with those hooks.
  const [channel,setChannel] = useState(defaultChannel);
  const [messages,setMessages] = useState([]);
  var time = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });

  let messs = "";
  if (localStorage.getItem("clan") == null ){
    messs = "";
  }else{
    messs =  localStorage.getItem("clan") ;
  }
  const [username,] = useState(localStorage.getItem("user")+" " +messs+ " "+ time);
  const tempChannel = useInput();
  const tempMessage = useInput();
  //This is where we set up PubNub and handle events that come through. Reruns on channel name update!
  useEffect(()=>{
    console.log("setting up pubnub");
    const pubnub = new PubNub({
      publishKey: "pub-c-2f3f2f52-3bce-439d-a692-10dd86ad823a",
      subscribeKey: "sub-c-e3703732-91f4-11ec-8158-ea060f348a12",
      uuid: username
    });


    pubnub.addListener({
     status: function(statusEvent) {
       if (statusEvent.category === "PNConnectedCategory") {
         console.log("Connected to PubNub!")
       }
     },
     message: function(msg) {
       if(msg.message.text){
         console.log(msg.message.text)
         let newMessages = [];
         newMessages.push({
           uuid:msg.message.uuid,
           text: msg.message.text
         });
         setMessages(messages=>messages.concat(newMessages))
       }
     }
   });
     //Subscribes to the channel in our state
     pubnub.subscribe({
         channels: [channel]
     });
     pubnub.history(
     {
         channel: channel,
         count: 10, // 100 is the default
         stringifiedTimeToken: true // false is the default
     }, function (status, response){
        let newMessages = [];
         for (let i  = 0; i < response.messages.length;i++){
           newMessages.push({
             uuid:response.messages[i].entry.uuid ,
             text: response.messages[i].entry.text
           });
         }
         setMessages(messages=>messages.concat(newMessages));
       }
     );
    return function cleanup(){
      console.log("shutting down pubnub");
      pubnub.unsubscribeAll();
      setMessages([]);
    }
  },[channel, username]);
  //Adding back browser button listener
  useEffect(() => {
    window.addEventListener("popstate",goBack);

    return function cleanup(){
      window.removeEventListener("popstate",goBack);
    }
  },[]);

  function handleKeyDown(event){
    if(event.target.id === "messageInput"){
      if (event.key === 'Enter') {
        publishMessage();
      }
    }else if(event.target.id === "channelInput" && tempChannel.value == messs){
      //  if (event.onClick === 'Enter') {
        //Navigates to new channels
        const newChannel = tempChannel.value.trim();
        if(newChannel){
          if(channel !== newChannel){
            //If the user isnt trying to navigate to the same channel theyre on
            setChannel(newChannel);
            let newURL = window.location.origin + "?channel=" + newChannel;
            window.history.pushState(null, '',newURL);
            tempChannel.setValue('');
          }
        }else{
          //If the user didnt put anything into the channel Input
          if(channel !== "Global"){
            //If the user isnt trying to navigate to the same channel theyre on
            setChannel("Global");
            let newURL = window.location.origin;
            window.history.pushState(null, '',newURL);
            tempChannel.setValue('');
          }
        }
      //  }
    }

  }

  //Publishing messages via PubNub
  function publishMessage(){
   if (tempMessage.value) {
     let messageObject = {
       text: tempMessage.value,
       uuid: username
     };

     const pubnub = new PubNub({
        publishKey: "pub-c-2f3f2f52-3bce-439d-a692-10dd86ad823a",
        subscribeKey: "sub-c-e3703732-91f4-11ec-8158-ea060f348a12",
        uuid: username
      });
     pubnub.publish({
       message: messageObject,
       channel: channel
     });
     tempMessage.setValue('');
   }
 }
  function goBack() {
    //Access the parameters provided in the URL
    let query = window.location.search.substring(1);
    if(!query){
      setChannel("Global")
    }else{
      let params = query.split("&");
      for(let i = 0; i < params.length;i++){
        var pair = params[i].split("=");
        //If the user input a channel then the default channel is now set
        //If not, we still navigate to the default channel.
        if(pair[0] === "channel" && pair[1] !== ""){
            setChannel(decodeURI(pair[1]))
        }
      }
    }
  }

  //Check if the user is logged in
  let loggedIn = localStorage.getItem("logIn")
  function handleClr (event) {
    localStorage.clear();
    }
  // render(){




  return (
    <div className="App">
      <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top theNavBar">
        <li class="navbar-brand">
          <Link to="/" class="nav-link navLogo">
            Capstone Project
          </Link>
        </li>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <li class="nav-item">
              <Link to="/" class="nav-link highlightGreen">
                Home
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/Account" class="nav-link highlightGreen">
                Account
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/Clan" class="nav-link highlightGreen">
                Clan
              </Link>
            </li>
          </div>
          <div class="ml-auto">
            <Link
              to="/Login"
              class="btn btn-light ms-3 nav-link"
              onClick={() => {
               handleClr();
              }}
            >
              Login/Register
            </Link>
          </div>
        </div>
      </nav>
      );
      <main role="main" class="container-fluid">
        <div className="main" class="theAppLeft">
          <Routes>
            {/* <Route path='/' render={props =>
              (<Home {... props} loggedInStatus={this.state.loggedInStatus}/>
              )}
              /> */}
            <Route path="/" element={<Home />}></Route>
            <Route path="/Account" element={<Account />}></Route>
            <Route path="/Clan" element={<Clan />}></Route>
            <Route path="/Login" element={<Login />}></Route>
            <Route path="*" element={<NotFound />}></Route>

            {/*
          <Route excact path={'/Profile'} render={(props) =>(
            <Profile {... props} loggedInStatus={this.state.loggedInStatus}/>
          )}
            /> */}

            <ProtectedRoute path="/Profile" element={<Profile />} />

            <ProtectedRoute path="/Profile/:user" element={<Profile/>}/>
          </Routes>
        </div>
       
        <div class="theAppRight">
     
          <Card >
            <CardContent class="chatBox">
              <div className="top">
                <Typography variant="h4" inline class="chatChannelName">
                {channel} Chat
                  </Typography>
                  {messs &&
            
                 <Input
                 
                  style={{  float: 'right',
                  'padding-right': '2%'} }
                  disabled
                  className="channel"
                  id="channelInput"
                  onClick={handleKeyDown}
                   placeholder ="{channel}"
                  onChange = {tempChannel.onChange}
                  value={tempChannel.value = messs}
                > 
                
                </Input>

                  }
              </div>
              <div>
                <Log messages={messages}/>
              </div>
            </CardContent>

            {loggedIn &&
              <CardActions>
              <Input
                placeholder="Enter a message"
                fullWidth={true}
                id="messageInput"
                value={tempMessage.value}
                onChange={tempMessage.onChange}
                onKeyDown={handleKeyDown}
                inputProps={{'aria-label': 'Message Field',}}
                autoFocus={true}
              />
              <Button
                size="small"
                color="primary"
                onClick={publishMessage}
                >
                Send
              </Button>
            </CardActions>
            }
          </Card>
          
        </div>


      </main>

      <footer class="footer mt-auto py-3 theFooter">
        <div class="container footer-copyright text-center py-3">
          @2021 Seneca Capstone Project:{" "}
          <a href="https://github.com/SenecaCollegeCapstoneProject2021-2022/Group10">
            github
          </a>
        </div>
      </footer>
    </div>
  );
}

//Log functional component that contains the list of messages
function Log(props){
 
  return(
    <List component="nav" class="messageList">
      <ListItem>
      <Typography component="div">
        { props.messages.map((item, index)=>(
          <Message key={index} uuid={item.uuid} text={item.text}/>
        )) }
      </Typography>
      </ListItem>
    </List>
  )
}

//Our message functional component that formats each message.
function Message(props){
  return (
    <div >
      { props.uuid }: { props.text }
    </div>
  );
}

export default App;