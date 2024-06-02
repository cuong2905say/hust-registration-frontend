import {client} from "./axios.js";

export const getInfo = () => {
    return client.get('/user/get-info')
}

export const getMetadata = (metadataKey) => {
    return
}