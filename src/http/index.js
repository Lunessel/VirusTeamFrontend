import axios from "axios";
import {useNavigate} from "react-router-dom";

export const API_URL = `http://34.118.102.90:8443/api/v1/`

const $api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json"
    }

})

$api.interceptors.request.use((config) => {
    config.headers['access-token'] = `${localStorage.getItem('token')}`
    return config;
})

$api.interceptors.response.use((config) => {
    return config;
},async (error) => {
    console.log(error)
    const originalRequest = error.config;
    if (error.response.status === 401) {
        localStorage.removeItem('token')
        const navigate = useNavigate();
        navigate('/')
    }
})

export default $api;