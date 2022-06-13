import React, { useState } from 'react'
import loginService from "../services/login"
import noteService from "../services/notes"
import Notification from './Notification';
import Toggleable from './Toggleable';
import PropTypes from 'prop-types'
const Login = ({setUser}) => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    const handleLogin = async(e)=>{
    e.preventDefault()

    try {
     const user = await loginService.login({
         username, password
     })
     noteService.setToken(user.token)
     window.localStorage.setItem("loggedNoteApp", JSON.stringify(user))
     setUser(user)
     setUsername("")
     setPassword("")
    } catch (err) {
        setErrorMessage("Wrong credentials")
        setTimeout(()=>{
        setErrorMessage(null)
        }, 5000)
    }
    }
    
  return (
    <>
        <Notification message={errorMessage}/>
      <Toggleable buttonLabel="Show login">
        <form onSubmit={handleLogin}>
        <input type="text" name="username" value={username} onChange={({target})=>{setUsername(target.value)}} placeholder="username"/>          
        <input type="password" name="password" value={password} onChange={({target})=>{setPassword(target.value)}} placeholder="password"/>
        <button id="login-form-button"value="submit">login</button>
        </form>
      </Toggleable>
        
    </>
  )
}

export default Login