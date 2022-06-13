import React, { useState, useRef } from "react";
import Toggleable from "../Toggleable";
const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState("");
  const toggleableRef = useRef()
  const handleSubmit = async(e) => {
    e.preventDefault();
    const noteObject = {
      content: newNote,
      important: false,
    };

    createNote(noteObject)
    setNewNote("");
   toggleableRef.current.toggleVisibility()
  };

  const handleChange = (e) => {
    setNewNote(e.target.value);
   
  };

  return (
    <Toggleable buttonLabel="Show notes" ref={toggleableRef}>
     <h3 >Create a new note</h3> 
    <form id="note-form" onSubmit={handleSubmit}>
      <input
        type="text"
        id="note-input"
        name="note-input"
        placeholder="Write your note content"
        value={newNote}
        onChange={handleChange}
        />
      <button name="submit" type="submit">save</button>
    </form>
      </Toggleable>
  );
};

export default NoteForm;
