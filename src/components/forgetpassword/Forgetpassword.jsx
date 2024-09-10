import classNames from "classnames/bind";
import Styles from "./forgetpassword.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(Styles);
export default function ForgetPassword() {
    return (
        <>
            <div className={cx("wrapper-form")}>
                <input type="text" className={cx("wrapper-form-email")} placeholder="nhập email" />
                <button className={cx("wrapper-form-btn")}>gửi</button>
            </div>
            <Link to="/">back</Link>
        </>
    );
}
