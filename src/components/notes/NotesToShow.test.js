import '@testing-library/jest-dom'
import axios from 'axios'
import noteService from '../../services/notes'

test('<NotesToShow/> mock axios', async ()=>{
    jest.spyOn(axios, 'get').mockReturnValueOnce({
        data: {
                content: 'This is a note in with mock',
                important: true
                }
    })
 
    const results = await noteService.getAll()
    console.log(results)
    expect(results).toBe('This is a note in with mock')
 


})