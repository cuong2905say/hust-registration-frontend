import {client} from "./axios.js";
import {toast} from "react-toastify";

export const getInfo = async () => {
    return client.get('/user/get-info')
        .then(response => {
            return response.data.data;
        })
        .catch(err => {
            toast.error("Không thể lấy thông tin cá nhân")
            return undefined
        })
}

export const getMetadata = (metadataKey) => {
    return
}