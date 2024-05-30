import axios from "axios";

export const client = axios.create({
    baseURL: 'http://localhost:8081',
})

export const post = (url, data) => {
    return client.post(url,data,{
        headers:{
            'Content-Type':'application/json'
        }
    });
}