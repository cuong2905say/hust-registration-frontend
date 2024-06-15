import {client} from "./Axios.js";
import {toast} from "react-toastify";

export const getDayStartYear = async (year) => {
    try{
        const {data} = await client.get('/public/metadata/get-day-start-year',{
            params:{
                year: year
            }
        })
        return data.data
    }catch(err) {
        toast.error(err.response.data.message)
        throw err
    }
}