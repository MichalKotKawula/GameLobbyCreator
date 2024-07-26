import "./Login.css";
import React, { Component, useState } from 'react';
import axios from "axios";
import {useNavigate, Link} from "react-router-dom";

 class Login extends Component{
  constructor(props){
    super(props);

    this.registercheck = {
      email: false,
      username: false,
      password: false,
      terms: false,
      status: false,
      userGame: false,
      userGroup: false
    }
    this.RegisterCheckFunc = this.RegisterCheckFunc.bind(this);
    this.handleEmailCheck = this.handleEmailCheck.bind(this);
    this.handleUsernameCheck = this.handleUsernameCheck.bind(this);
    this.handlePasswordCheck = this.handlePasswordCheck.bind(this);
    this.handleTermsCheck = this.handleTermsCheck.bind(this);
    this.handleRegistration = this.handleRegistration.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);

  }

  RegisterCheckFunc = event =>{
    if(this.registercheck.email && this.registercheck.username && this.registercheck.password && this.registercheck.terms){
      document.getElementById("Register").disabled = false;
    } else{
      document.getElementById("Register").disabled = true;
    }
  }

  handleEmailCheck = event =>{
    if(document.getElementById("rEmail").value.length != 0){
      this.registercheck.email = true;
    } else {
      this.registercheck.email = false;
    }
    this.RegisterCheckFunc();
  }

  handleUsernameCheck = event =>{
    if(document.getElementById("rUsername").value.length != 0){
      this.registercheck.username = true;
    } else {
      this.registercheck.username = false;
    }
    this.RegisterCheckFunc();
  }

  handlePasswordCheck = event =>{
    document.getElementById("cError").innerHTML = ""
    if(document.getElementById("rPassword").value.length < 6){
      document.getElementById("cError").innerHTML = "Password cannot be less than 6 characters";
    } else if(document.getElementById("confirm").value != document.getElementById("rPassword").value){
      document.getElementById("cError").innerHTML = "Password is not identical";
      this.registercheck.password = false;
    } else{
      this.registercheck.password = true;
    }
    this.RegisterCheckFunc();
  }

  handleTermsCheck = event =>{
    this.registercheck.terms = document.getElementById("terms").checked;
    this.RegisterCheckFunc();
  }

  handleRegistration = event =>{
    event.preventDefault();
    const newUser = {
        Email: document.getElementById("rEmail").value,
        Username: document.getElementById("rUsername").value,
        Password: document.getElementById("rPassword").value,
        Status : "offline",
        UserGame : "none",
        UserGroup : "none"
    }
    fetch("https://projectt490.herokuapp.com/login").then(res => {
      if(res.ok){
        return res.json()
      } else if(res.status == 500){
        alert(res.statusText);
      }
    }).then(users => {
      let check = false;
      for(var i = 0; i < users.length; i++){
        if(users[i].Username == newUser.Username || users[i].Email == newUser.Email){
          check = true;
          break;
        }
      }
      if(check){
        alert("Email/Username is already in used", <Link to="/">Home</Link>);
      } else {
        axios.post('https://projectt490.herokuapp.com/register' ,newUser)
        alert("Register succesfull")
      }
    });
   }


  handleLogin = event =>{
    event.preventDefault();

    // work here

    const loginUser = {
      Username: document.getElementById("lUsername").value,
      Password: document.getElementById("lPassword").value,
      Status : "online"
    }
    fetch("https://projectt490.herokuapp.com/login").then(res => {

      if(res.ok){
        return res.json()
      } else if(res.status == 500){
        alert(res.statusText);
      }
    }).then(users => {



      let check = false;
      for(var i = 0; i < users.length; i++){
        if(users[i].Username == loginUser.Username){
          if(users[i].Password == loginUser.Password){
            check = true;
            loginUser.Status ="online"

          }
          break;
        }
      }
      if(check){

        //Add username to localstorage using axios
        localStorage.setItem('user', loginUser.Username);

        //Add logIn to localstorage using axios
        localStorage.setItem('logIn', true);

        alert("Login Succesfull, Welcome " + loginUser.Username);

        axios.put('https://projectt490.herokuapp.com/update/' + loginUser.Username ,loginUser);
        this.handleSuccessfulAuth(users.data);
      } else {
        alert("Username / Password is incorrect")
      }
    });
  }
  handleSuccessfulAuth(data) {
    this.props.navigate('/Profile');
   }

  render(){
    return(

    <div class="container mt-3">

        <div class="row text-white">
          <div class="lg col-md-12 widgetBlock-lrg rounded leftAligned shadow-lg p-3 mb-5">
              <form onSubmit={this.handleLogin }>
                  <h2>Login</h2>

                  <p><input type="text" id="lUsername" name="username" placeholder="Username"/></p>

                  <p><input type="password" id="lPassword" name="password" placeholder="Password"/></p>

                  <input type="submit" id="Login" value="Login" />


              </form>
          </div>
          <div class="lg col-md-12 widgetBlock-reg rounded leftAligned shadow-lg p-3 mb-5">
            <form onSubmit={this.handleRegistration }   >
              <h2>Register</h2>

              <p><input type="text" id="rEmail" name="Email" onChange={this.handleEmailCheck} placeholder="Email Address" /></p>

              <p><input type="text" id="rUsername" name="username" onChange={this.handleUsernameCheck} placeholder="Username"/></p>

              <p><input type="password" id="rPassword" name="password" onChange={this.handlePasswordCheck}  placeholder="Password"/></p>

              <p><input type="password" id="confirm" name="confirm" onChange={this.handlePasswordCheck} placeholder="Confirm Password"/></p>

              <p id="cError"/>

              <p><input type="checkbox" id="terms" name="terms" onClick={this.handleTermsCheck} /> <label for="terms">I agree to the Terms and Conditions</label></p>

              <input type="submit" id="Register" value="Register" disabled/>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
function WithNavigate(props) {
  let navigate = useNavigate();
  return <Login {...props} navigate={navigate} />
}
export default WithNavigate;

//video where i learn how to send data from and to react / mongodb
//https://www.youtube.com/watch?v=nUbNn0voiBI
