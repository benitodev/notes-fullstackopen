import axios from "axios"
const baseUrl = "https://notes-api-fullstackopen.herokuapp.com/api/login"
const baseLocalhost = "http://localhost:3001/api/login"
const login =async (credentials)=>{
    const response = await axios.post(baseLocalhost, credentials)
  
    return response.data
}
export default {login}