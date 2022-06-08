import axios from "axios";
const baseUrl = "https://notes-api-fullstackopen.herokuapp.com/api/notes"
const baseLocalhost = "http://localhost:3001/api/notes"
let token = null
const setToken = newToken =>{
    token = `Bearer ${newToken}`
}
const getAll = async () => {
    try {
        const request = await axios.get(baseUrl)

        return request.data.content
    } catch (err) {
        console.log(err)
    }
}

const create = async (newNote)=>{
    const config = {
        headers: {Authorization: token}
    }
    try {
        const response = await axios.post(baseUrl, newNote, config)
        console.log(response)
        return response.data.content
    } catch (err) {
        console.log(err)  
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {getAll, create, setToken}