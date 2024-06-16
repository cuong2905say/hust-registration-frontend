import {client} from "./Axios.js";
import {toast} from "react-toastify";

/**
 *
 * @param email
 * @param password
 * @returns string: Token
 */
export const login = async (email, password) => {
    try {
        let {data} = await client.post('/api/v1/auth/login', {email: email, password: password})

        toast.success("Đăng nhập thành công: " + email)
        // TODO: not save in localStorage
        localStorage.setItem('email', email)
        localStorage.setItem('password', password)
        localStorage.setItem('access_token', data.data.token)
        localStorage.setItem('expires', data.data.expires)
        localStorage.setItem('role', data.data.role)
        return data.data
    } catch (err) {
        toast.error("Đăng nhập thất bại: " + err.response.data.message)
        throw err;
    }
    // data
    //     .then(res => {
    //         toast.success("Đăng nhập thành công: "+email)
    //         // TODO: not save in localStorage
    //         localStorage.setItem('email', email)
    //         localStorage.setItem('password', password)
    //         localStorage.setItem('access_token', res.data.data.token)
    //         localStorage.setItem('expires', res.data.data.expires)
    //         localStorage.setItem('role', res.data.data.role)
    //         console.log(res)
    //         return res.data.data
    //     })
    //     .catch(err => {
    //         toast.error("Đăng nhập thất bại: " + err.response.data.message)
    //         throw err;
    //     })
}

export const getToken = () => {
    let token = localStorage.getItem('access_token')
    let expires = localStorage.getItem('expires')
    if (expires >= Date.now()) {
        return token;
    }
    let email = localStorage.getItem('email')
    let password = localStorage.getItem('password')
    if (email === null || password === null) {
        return null;
    }
    return login(email, password)
}

export const logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('expires')
    localStorage.removeItem('role')
    localStorage.removeItem('email')
    localStorage.removeItem('password')
}