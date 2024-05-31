import {post} from "axios";

export const login = (email,password) => {
    return post('/api/v1/auth/login',{email:email,password:password})
}