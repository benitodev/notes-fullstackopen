import React from 'react'
import noteService from "../services/notes"
const Logout = ({setUser, user}) => {
    const handleLogout = ()=>{
        setUser(null)
        window.localStorage.removeItem("loggedNoteApp")
         noteService.setToken(user.token)
    }
  return (
    <button id='logout-button' onClick={handleLogout}>Logout</button>
  )
}

export default Logout