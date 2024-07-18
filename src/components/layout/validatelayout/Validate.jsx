import classNames from "classnames/bind";
import Styles from "./validate.module.scss";
import { useEffect, useState } from "react";
import UserService from "~/core/services/user/user.service.ts";
import AuthService from "~/core/services/auth/auth.service.ts";

const cx = classNames.bind(Styles);
function Validate() {
    const [valueToken, setValueToken] = useState("");

    useEffect(() => {
        const data = async () => {
            const userService = UserService.getInstance();
            const res = await userService.Validate();
        };
    }, []);

    const handleClick = async (e) => {
        e.prevenDefault();
        try {
            const userService = UserService.getInstance();
            const responseEmail = await userService.Validate();
            const response = await userService.ValidateToken(valueToken);
            // return response and user for localstorage
            if (response.response.status === 201) {
                alert("Xác thực thành công");
                const authService = new AuthService();
                const responseLogin = await authService.Login(response.user.email, response.user.password);
                console.log("responseLogin : ", responseLogin);
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    return (
        <div className={cx("validate")}>
            <div className="validate-wrapper">
                <input
                    onChange={(e) => setValueToken(e.target.value)}
                    type="text"
                    name=""
                    id=""
                    placeholder="nhập mã xác thực email"
                />
                <button onClick={handleClick}>gửi</button>
            </div>
        </div>
    );
}

export default Validate;
