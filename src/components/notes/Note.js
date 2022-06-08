import React, { useEffect, useState } from "react";
import NoteForm from "./NoteForm";
import noteService from "../../services/notes.js"
import Login from "../Login";
import Logout from "../Logout";
import NotesToShow from "./NotesToShow";
const Note = () => {
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState(null);
  const [showAll, setShowAll] = useState(true);

  useEffect(()=>{
    const awaitNotes = async() =>{
      const notes = await noteService.getAll()

      setNotes(notes)
    } 
    awaitNotes()
}
  ,[])

  useEffect(()=>{
    const loggedUserJSON = window.localStorage.getItem("loggedNoteApp")
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])



  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  return (
    <>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <NotesToShow notes={notesToShow}></NotesToShow>
      {user === null ? <Login setUser={setUser}/> : <><NoteForm setNotes={setNotes} notes={notes}  user={user}/>  <Logout setUser={setUser} user={user}/> </>}

    </>
  );
};

export default Note;
