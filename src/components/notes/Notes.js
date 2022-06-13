import React, { useEffect, useState } from "react";
import NoteForm from "./NoteForm";
import noteService from "../../services/notes.js"
import Login from "../Login";
import Logout from "../Logout";
import NotesToShow from "./NotesToShow";
import Notification from "../Notification";
const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState(null);
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);

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

  const toggleImportanceOf = async(id) => {
    const note = notes.find(note => note.id === id)
    try {    
      const res = await noteService.update(id, {...note, important: !note.important})
      setNotes(notes.map(n => n.id !== id ? note : res ))
    } catch (err) {
      setErrorMessage(`Note ${note.content} was already removed from server`)
    }
  };

  const addNote = async (noteObject) =>{
    const newNote = await noteService.create(noteObject)
    setNotes([...notes, newNote])
    console.log(notes)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

 
  return (
    <>
    <Notification message={errorMessage}/>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      {notes.length > 0 && <NotesToShow notes={notesToShow} toggleImportanceOf={toggleImportanceOf}></NotesToShow>}
     
      {user === null ? <Login setUser={setUser}/> : <><NoteForm createNote={addNote} notes={notes}  user={user}/>  <Logout setUser={setUser} user={user}/> </>}

    </>
  );
};

export default Notes;
