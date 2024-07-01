import {client} from "./Axios.js";
import {toast} from "react-toastify";
import * as Constants from "../util/constants/Constant.js"

export const getDayStartYear = async (semester) => {
    try {
        const {data} = await client.get('/api/metadata', {
            params: {
                semester: semester.slice(0,4) + '1',
                key: Constants.START_WEEK_1
            }
        })
        return data.data
    } catch (err) {
        toast.error(err.response.data.message)
        throw err
    }
}

export const getCurrentSemester = async () => {
    try{
        const {data} = await client.get('/api/metadata/current-semester')
        return data.data
    }catch (err){
        toast.error("Không có dữ liệu về kì học hiện tại")
        throw err
    }
}

export const getMetadataSemester = async (semester) => {
    try {
        const {data} = await client.get('/api/metadata/get-by-semester', {
            params:{
                semester:semester
            }
        })
        return data.data
    } catch (err) {
        toast.error(err.response.data.message)
        throw err
    }
}