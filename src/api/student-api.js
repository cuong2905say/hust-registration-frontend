import {post} from "./axios.js";

export const login = (email, password) => {
    const data = {email, password};
    post('/api/v1/auth/login', data).then(a => console.log(a.status)).catch(e => console.log(e))
}