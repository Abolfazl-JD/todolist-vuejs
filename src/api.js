import axios from 'axios'


const instance = axios.create({
    baseURL: 'https://vue-todolist-f1235-default-rtdb.firebaseio.com',
    timeout: 5000
})



export default instance