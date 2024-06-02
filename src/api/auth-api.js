import {client, isSuccess} from "./axios.js";
import {toast} from "react-toastify";

/**
 *
 * @param email
 * @param password
 * @returns string: Token
 */
export const login = (email, password) => {
    let data = client.post('/api/v1/auth/login', {email: email, password: password})
    data
        .then(res => {
            toast.success("Đăng nhập thành công")

            localStorage.setItem('email', email)
            localStorage.setItem('password', password)
            localStorage.setItem('access_token', res.data.data.token)
            localStorage.setItem('expires', res.data.data.expires)
            localStorage.setItem('role', res.data.data.role)
            return res.data.data.token
        })
        .catch(erraaa => {
            console.log(erraaa)
            toast.error("Đăng nhập thất bại: " + erraaa.response.data.message)
            return undefined
        })
    if (isSuccess(data)) {
        console.log('fucking?')
    }

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
    localStorage.clear()
}