import React from 'react'
import Note from './Note';

const NotesToShow = ({notes, toggleImportanceOf}) => {

  return (
    <ul>
    {notes.length > 0 && notes.map((note) => (
     <Note key={note.id} note={note} toggleImportance={toggleImportanceOf}></Note>
    ))}
  </ul>
  )
}

export default NotesToShow