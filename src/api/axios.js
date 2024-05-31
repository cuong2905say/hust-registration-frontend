import axios from "axios";
import {toast} from "react-toastify";

export const client = axios.create({
    baseURL: 'http://localhost:8081',
})

export const checkSuccess = (response) => {
    return response
        .then(toast.success('Thành công'))
        .catch(err => {if(err.statusCode)toast.error(err.statusCode +': '+err.response.data.message)})
}

export const post = (url, data) => {
    return checkSuccess(client.post(url,data,{
        headers:{
            'Content-Type':'application/json'
        }
    }))
}

export const get = (url) => {
    return checkSuccess(client.get(url,{

    }))
}

export const put = (url, data) => {
    return checkSuccess(client.put(url,data,{
        headers:{
            'Content-Type':'application/json'
        }
    }))
}

export const patch = (url, data) => {
    return checkSuccess(client.patch(url,data,{
        headers:{
            'Content-Type':'application/json'
        }
    }))
}

export const _delete = (url,data) => {
    return checkSuccess(client.del(url,data,{
        headers:{
            'Content-Type':'application/json'
        }
    }))
}
