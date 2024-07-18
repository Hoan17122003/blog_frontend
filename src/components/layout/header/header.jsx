import classNames from "classnames/bind";
import Styles from "./header.module.scss";
import Search from "~/components/search/search";
import Login from "~/components/login/Login";
import Register from "~/components/register/Register";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import AuthService from "~/core/services/auth/auth.service.ts";

const cx = classNames.bind(Styles);
function Header() {
    const [visibleModal, setVisibleModal] = useState("false");
    const [stateHeadingModal, setStateHeadingModal] = useState("login");
    const [hiden, setHiden] = useState(false);
    const $ = document.querySelector.bind(cx);

    const handleVisibleModal = (e) => {
        setVisibleModal((prev) => !prev);
        e.preventDefault();
    };
    const token = JSON.parse(localStorage.getItem("token"));

    const handleLogout = () => {
        const authService = new AuthService();
        authService.Logout();
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        window.location.reload();
    };

    const handleDisplay = (e) => {
        setHiden((prev) => !prev);
        e.preventDefault();
    };

    return (
        <div className={cx("header")}>
            <Search />
            {!token ? (
                <button onClick={handleVisibleModal} className={cx("login-register")}>
                    <span>login / register</span>
                </button>
            ) : (
                <></>
            )}
            {visibleModal == true ? (
                <div className={cx("wrapper")}>
                    <div className={cx("modal")}>
                        <button onClick={handleVisibleModal}>
                            <i>close</i>
                        </button>
                        <div>
                            <div className={cx("modal-wrapper")}>
                                <h2 className={cx("modal-heading-item")} onClick={(e) => setStateHeadingModal("login")}>
                                    Login
                                </h2>
                            </div>
                            <div className={cx("modal-wrapper")}>
                                <h2
                                    className={cx("modal-heading-item")}
                                    onClick={(e) => setStateHeadingModal("register")}
                                >
                                    Register
                                </h2>
                            </div>
                        </div>
                        {stateHeadingModal.toLowerCase() === "login" ? <Login /> : <Register />}
                    </div>
                </div>
            ) : (
                ""
            )}
            {token && (
                <div className={cx("test")}>
                    <div className={cx("hamber")}>
                        <>
                            <i className={cx("icon_open")} onClick={handleDisplay}>
                                <GiHamburgerMenu />
                            </i>
                            <div className={cx("hamber-wrapper")}>
                                <div className={cx("hamber-wrapper-item")}>
                                    <Link to="/profile">Profile</Link>
                                </div>
                                <div onClick={handleLogout} className={cx("hamber-wrapper-item")}>
                                    <Link to="/">Logout</Link>
                                </div>
                                <div className={cx("hamber-wrapper-item")}>
                                    <Link to="/setting">Setting</Link>
                                </div>
                            </div>
                        </>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Header;
