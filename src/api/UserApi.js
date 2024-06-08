import {client} from "./Axios.js";
import {toast} from "react-toastify";

export const getInfo = async () => {
    try {
        const {data} = await client.get('/user/get-info')
        return data.data
    } catch (err) {
        toast.error("Không thể lấy thông tin cá nhân")
        throw err
    }
}

export const getMetadata = (metadataKey) => {
    return
}