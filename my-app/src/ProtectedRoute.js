import React from 'react'
import {Route, useNavigate} from 'react-router-dom'
import Login from './Login'

function ProtectedRoute  ({component: Component, ...rest}){

   return <Route{...rest} render={props=> {
       
    if (Login){
        return <Component {...props}/>
    }else{
        return <Login/>

     
    }
   
    
    
    }}/>
}


export default ProtectedRoute;