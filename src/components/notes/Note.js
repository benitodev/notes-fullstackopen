import React from 'react'

const Note = ({note, toggleImportance}) => {

  const label = note.important ? 'Make not important' : 'Make important'
  return (
      
    <li onClick={() => toggleImportance(note.id)} key={note.id}>
    {note.content}
    <button>{label}</button>
  </li>
  )
}

export default Note