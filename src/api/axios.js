import axios from "axios";
import {getToken} from "./auth-api.js";

export const client = axios.create({
    baseURL: 'http://localhost:8081',
})

const whiteList = ['/api/v1/auth', '/public']
client.interceptors.request.use(
    config => {
        if (whiteList.some(prefix => config.url.startsWith(prefix))) {
            return config
        }

        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)

export const isSuccess = (response) => {
    return response.status >= 200 && response.status < 300
}

