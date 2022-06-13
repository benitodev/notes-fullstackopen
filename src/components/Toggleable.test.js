import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {fireEvent, render, screen} from '@testing-library/react'
import Toggleable from './Toggleable'

describe('Toggleable', ()=>{
    const buttonLabel = 'show'
 

    beforeEach(()=>{
       render(<Toggleable buttonLabel={buttonLabel}>
            <div>togglable content</div>
        </Toggleable>)
    })

    test('renders its children', ()=>{
        const el =  screen.getByText('togglable content')
        expect(el.parentNode).toHaveStyle('display: none')
    })
    test('after clicking its children mut be shown', ()=>{
        const button = screen.getByText(buttonLabel)
        fireEvent.click(button)
        const el = screen.getByText('togglable content')
        expect(el.parentNode).not.toHaveStyle('display: none')
    })
    test('toggled content can be closed', ()=>{
        const button = screen.getByText(buttonLabel)
        fireEvent.click(button)

        const el =  screen.getByText('togglable content')
        expect(el).not.toHaveStyle('display: none')

        const cancelButton = screen.getByText('Cancel')        
        fireEvent.click(cancelButton)

        expect(el.parentNode).toHaveStyle('display: none')
    })
})