import classNames from "classnames/bind";
import Styles from "./validate.module.scss";
import { useEffect, useState } from "react";
import UserService from "~/core/services/user/user.service.ts";
import AuthService from "~/core/services/auth/auth.service.ts";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(Styles);
function Validate() {
    const [valueToken, setValueToken] = useState("");
    const navigation = useNavigate();

    useEffect(() => {
        const data = async () => {
            const user = JSON.parse(localStorage.getItem("user"));
            const email = user.email;
            console.log("email : ", email);
            const userService = UserService.getInstance();
            await userService.ValidateEmail(email);
        };
        data();
    }, []);

    const handleClick = async (e) => {
        try {
            const userService = UserService.getInstance();
            const response = await userService.ValidateToken(valueToken);
            if (response.response.status === 201) {
                alert("Xác thực thành công");
                navigation("/home");
                // window.location.href = "/home";
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
