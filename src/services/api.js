import axios from "axios";

const axioInstance = axios.create({
    baseURL: 'http://localhost:5000'
})

const setToken = (token) => {
    axioInstance.defaults.headers['Authorization'] = `Bearer ${token}`
}

export { axioInstance, setToken };