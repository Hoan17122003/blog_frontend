import classNames from "classnames/bind";
import Styles from "./register.module.scss";
import { useRef, useState } from "react";
import User from "~/core/services/user/User.entity.ts";
import UserService from "~/core/services/user/user.service.ts";

const cx = classNames.bind(Styles);
function Register() {
    const usernameRef = useRef();
    const emailRef = useRef();
    const [password, setPassword] = useState("");
    const passwordAgain = useRef();
    const fullnameRef = useRef("");

    const handleSubmit = async () => {
        if (password != passwordAgain.current.value) {
            throw new Error("mật khẩu không khớp");
        }
        const userEntity = new User(
            usernameRef.current.value,
            password,
            fullnameRef.current.value,
            emailRef.current.value
        );
        const userService = UserService.getInstance();
        const flag = await userService.Register(userEntity);
        console.log("flag : ", flag);
        if (flag.status === 201) {
            localStorage.setItem("user", JSON.stringify(flag.data));
            navigator("/validate-email");
        }
    };

    return (
        <div className={cx("register")}>
            <h2 className={cx("register-heading")}>Register</h2>
            <form className={cx("register-form")}>
                <div className={cx("register-form-item")}>
                    <label ref={usernameRef} htmlFor={cx("username")}>
                        username
                    </label>
                    <input ref={usernameRef} type="text" placeholder="Username" id={cx("username")} />
                </div>
                <div className={cx("register-form-item")}>
                    <label htmlFor={cx("email")}>email</label>
                    <input ref={emailRef} type="email" id={cx("email")} placeholder="email" />
                </div>
                <div className={cx("register-form-item")}>
                    <label htmlFor="fullname">fullname</label>
                    <input ref={fullnameRef} type="text" id="fullname" placeholder="fullname" />
                </div>
                <div className={cx("register-form-item")}>
                    <label htmlFor={cx("password")}>mật khẩu</label>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        id={cx("password")}
                        placeholder="Password"
                    />
                </div>
                <div className={cx("register-form-item")}>
                    <label htmlFor="password1">nhập lại mật khẩu</label>
                    <input ref={passwordAgain} type="password" id="password1" placeholder="nhập lại password" />
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
            </form>
        </div>
    );
}

export default Register;
