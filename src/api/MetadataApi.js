import {client} from "./Axios.js";
import {toast} from "react-toastify";
import * as Constants from "../util/constants/Constant.js"

export const getDayStartYear = async (year) => {
    try {
        const {data} = await client.get('/public/metadata', {
            params: {
                semester: year + '1',
                key: Constants.START_WEEK_1
            }
        })
        return data.data
    } catch (err) {
        toast.error(err.response.data.message)
        throw err
    }
}

export const getMetadataSemester = async (semester) => {
    try {
        const {data} = await client.get('/public/metadata/get-by-semester', {
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