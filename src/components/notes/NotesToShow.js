import React from 'react'

const NotesToShow = ({notes}) => {
    const toggleImportanceOf = (id) => {
        console.log(`importance of ${id} needs to be toggled`);
      };
  return (
    <ul>
    {notes.map((note) => (
      <li onClick={() => toggleImportanceOf(note.id)} key={note.id}>
        {note.content}
      </li>
    ))}
  </ul>
  )
}

export default NotesToShow