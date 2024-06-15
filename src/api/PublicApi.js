import {client} from "./Axios.js";
import {toast} from "react-toastify";

export const getAllClass = async (semester) => {
    try {
        const {data} = await client.get('/public/classes/get-all', {
            params: {
                semester: semester
            }
        })
        return data.data
    } catch (err) {
        toast.error('Lấy danh sách lớp thất bại' + err.response.data.message)
        throw err
    }
}


