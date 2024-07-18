// src/components/Login.js
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import Styles from "./login.module.scss";
import AuthService from "~/core/services/auth/auth.service.ts";

const cx = classNames.bind(Styles);
function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const authService = new AuthService();
            const response = await authService.Login(username, password);
            if (response.status == 201 && response.data.isActive == 0) {
                let user = {
                    username,
                    password,
                };
                user.email = response.data.email;
                localStorage.setItem("user", JSON.stringify(user));
                window.location.href = "/validate-email";
            }
            if (response.status == 201) {
                const token = response.data.token;
                localStorage.setItem("token", JSON.stringify(token));
                localStorage.setItem("role", JSON.stringify(response.data.role));
                console.log(response.data.statuscode);
                alert("đăng nhập thành công");
                window.location.href = "/news";
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={cx("login")}>
            <h2 className={cx("login-heading")}>Login</h2>
            <form className={cx("login-form")} onSubmit={handleSubmit}>
                <div className={cx("login-form-username")}>
                    <label htmlFor={cx("login-form-username-input")}>Username</label>
                    <input
                        className={cx("login-form-username-input")}
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        required
                    />
                </div>
                <div className={cx("login-form-password")}>
                    <label htmlFor={cx("login-form-password-input")}>Password</label>
                    <input
                        className={cx("login-form-password-input")}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                </div>
                <div onClick={handleSubmit} className={cx("btn")}>
                    <div className={cx("block")}>
                        <button type="submit" className={cx("btn", "btn-1", "color-green")}>
                            <svg>
                                <rect x="0" y="0" fill="none" width="100%" height="100%" />
                            </svg>
                            đăng nhập
                        </button>
                    </div>
                </div>
                <Link to="/forgetpassword">Quên mật khẩu</Link>
            </form>
        </div>
    );
}

export default Login;
