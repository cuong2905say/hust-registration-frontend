import '../css/login_popup.css';
import {useState} from "react";
import {login} from "../api/auth-api.js";

function LoginPopup() {
    const handleLogin = async ()=>{
        const data = await login(email, password);
        console.log(data)
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="login-container">
            <button className="office-button">Office 365</button>
            <div className="input-container">
                <input type="text" placeholder="Tên đăng nhập" className="login-input" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="Mật khẩu đăng nhập" className="login-input" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button className="login-button" onClick={handleLogin}>Đăng nhập</button>
            <button className="cancel-button">Hủy</button>
            <a href="/forgot-password" className="forgot-link">Quên mật khẩu?</a>
        </div>
    );
}

export default LoginPopup;
