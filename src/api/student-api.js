import {post} from "./axios.js";

export const login = (email, password) => {
    const data = {email, password};
    return post('/api/v1/auth/login', data)
}