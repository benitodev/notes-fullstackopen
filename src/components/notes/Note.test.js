import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import {fireEvent, render, screen} from '@testing-library/react'
import Note from './Note'

test('renders content', ()=>{
    const note = {
        content: 'This is a note in test',
        important: true
    }

 const {container} =  render(<Note note={note}></Note>)

expect(container).toHaveTextContent(note.content) })

test('clicking in the button calls event handler once', ()=>{
    const note = {
        content: 'This is a note in test',
        important: true
    }
    const mockHandler = jest.fn()
    render(<Note note={note} toggleImportance={mockHandler}></Note>)

    const button = screen.getByText('Make not important')
    fireEvent.click(button)
    expect(mockHandler).toHaveBeenCalledTimes(1)
})