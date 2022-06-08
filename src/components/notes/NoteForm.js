import React, { useState, useRef } from "react";
import noteService from "../../services/notes"
import Toggleable from "../Toggleable";
const NoteForm = ({ notes, setNotes }) => {
  const [newNote, setNewNote] = useState("");
  const toggleableRef = useRef()
  const handleSubmit = async(e) => {
    e.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };
   const note = await noteService.create(noteObject)
   setNewNote("");
   setNotes([...notes, note]);
   console.log(toggleableRef)
   toggleableRef.current.toggleVisibility()
  };

  const handleChange = (e) => {
    setNewNote(e.target.value);
   
  };

  return (
    <Toggleable buttonLabel="Show notes" ref={toggleableRef}>
     <h3 >Create a new note</h3> 
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        id="note"
        name="note"
        placeholder="Write your note content"
        value={newNote}
        onChange={handleChange}
        />
      <button type="submit">save</button>
    </form>
      </Toggleable>
  );
};

export default NoteForm;
