import axios from "axios";
const baseUrl = "https://notes-api-fullstackopen.herokuapp.com/api/notes"
const baseLocalhost = "http://localhost:3001/api/notes"
let token = null
const setToken = newToken =>{
    token = `Bearer ${newToken}`
}
const getAll = async () => {
    try {
        const request = await axios.get(baseLocalhost)

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
        const response = await axios.post(baseLocalhost, newNote, config)
        return response.data.content
    } catch (err) {
        console.log(err)  
    }
}

const update = async (id, newObject)=>{
    const config = {
        headers: {
            Authorization: token
        }
    }
    const request = await axios.put(`${baseLocalhost}/${id}`, newObject, config)
    console.log(request)
    return request.data.content
}
// eslint-disable-next-line import/no-anonymous-default-export
export default {getAll, create, setToken, update}