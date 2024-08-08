import classNames from "classnames/bind";
import Styles from "./header.module.scss";
import Search from "~/components/search/search";
import Login from "~/components/login/Login";
import Register from "~/components/register/Register";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import AuthService from "~/core/services/auth/auth.service.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleXmark,
    faSpinner,
    faMagnifyingGlass,
    faTimes,
    fas,
    faHome,
    faPen,
    faUsers,
    faBars,
    faNeuter,
} from "@fortawesome/free-solid-svg-icons";
import { faComment, faMessage } from "@fortawesome/free-regular-svg-icons";
import Footer from "~/components/footer/Footer";
import UserService from "~/core/services/user/user.service.ts";
import Cookies from "js-cookie";

const cx = classNames.bind(Styles);
function Header() {
    const [visibleModal, setVisibleModal] = useState("false");
    const [stateHeadingModal, setStateHeadingModal] = useState("login");
    const [hiden, setHiden] = useState(false);
    const [user, setUser] = useState([]);
    const [isActive, setActive] = useState("Home");
    const $ = document.querySelector.bind(cx);

    const handleVisibleModal = (e) => {
        setVisibleModal((prev) => !prev);
        e.preventDefault();
    };

    const handleLogout = () => {
        const authService = new AuthService();
        authService.Logout();
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        window.location.reload();
    };
    const token = localStorage.getItem("token");

    const handleDisplay = (e) => {
        setHiden((prev) => !prev);
        e.preventDefault();
    };
    // useEffect(() => {
    //     const data = async () => {
    //         const userId = Cookies.get("UserId");
    //         const userService = UserService.getInstance();
    //         const response = userService.Profile(userId);
    //         setUser(response.data);
    //     };
    //     data();
    // }, [token]);

    const User = () => {
        return (
            <div className={cx("information_basic")}>
                <div className={cx("Information_UserWrite_avatar")}>
                    <Link class={cx("avatar-container")} to={`/profile/${Cookies.get("UserId")}`}>
                        <img
                            className={cx("Information_UserWrite_avatar_img")}
                            src={`http://localhost:8080/${user[0]["avatar"] || ""}`}
                            alt="image"
                        />
                    </Link>
                </div>
                <div className={cx("Information_UserWrite_content")}>
                    <div className={cx("Information_UserWrite_content_fullname")}>
                        <Link to={`/profile/${Cookies.get("UserId")}`}>{user[0].fullname}</Link>{" "}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <header className="tm-header" id="tm-header">
                <div className="tm-header-wrapper">
                    <button className="navbar-toggler" type="button" aria-label="Toggle navigation">
                        <FontAwesomeIcon className={cx("icon-header")} icon={faBars} />
                    </button>
                    <div className="tm-site-header">
                        <div className="mb-3 mx-auto tm-site-logo">
                            <FontAwesomeIcon className={cx("icon-header")} icon={faTimes} />
                        </div>
                        <h1 className="text-center">WebstieBlog Công nghệ</h1>
                    </div>

                    {token && (
                        <>
                            {/* {User()} */}
                            <div className={cx("navigation")}>
                                <div className={cx("notification")}>
                                    <FontAwesomeIcon icon={faNeuter} />
                                    notification
                                </div>
                                <div className={cx("message")}>
                                    <FontAwesomeIcon icon={faMessage} />
                                    message
                                </div>
                            </div>
                        </>
                    )}
                    <nav className="tm-nav" id="tm-nav">
                        <ul>
                            <li
                                onClick={() => setActive("Home")}
                                className={`tm-nav-item  ${isActive === "Home" ? "active" : 0} `}
                            >
                                <Link to="/home" className="tm-nav-link">
                                    <FontAwesomeIcon className={cx("icon-header")} icon={faHome} />
                                    trang chủ
                                </Link>
                            </li>
                            {token ? (
                                <>
                                    <li
                                        onClick={() => setActive("Following")}
                                        className={`tm-nav-item ${isActive == "Following" ? "active" : 0}`}
                                    >
                                        <Link to="/Following" className="tm-nav-link">
                                            <FontAwesomeIcon className={cx("icon-header")} icon={faUsers} />
                                            theo dõi
                                        </Link>
                                    </li>
                                    <li
                                        onClick={() => setActive("Đăng Bài")}
                                        className={`tm-nav-item ${isActive == "Đăng Bài" ? "active" : 0}`}
                                    >
                                        <Link to="/me/post" className="tm-nav-link">
                                            <FontAwesomeIcon className={cx("icon-header")} icon={faPen} />
                                            Đăng bài
                                        </Link>
                                    </li>
                                    {JSON.parse(localStorage.getItem("role")) === "admin" && (
                                        <li
                                            onClick={() => setActive("BrowseAritcles")}
                                            className={`tm-nav-item ${isActive == "BrowseAritcles" ? "active" : 0}`}
                                        >
                                            <Link to="/browse-articles" className="tm-nav-link">
                                                <FontAwesomeIcon className={cx("icon-header")} icon={faCircleXmark} />
                                                Quản lý bài đăng
                                            </Link>
                                        </li>
                                    )}
                                    <li
                                        onClick={() => setActive("Profile")}
                                        className={`tm-nav-item ${isActive == "Profile" ? "active" : 0}`}
                                    >
                                        <Link to="/profile" className={`tm-nav-link`}>
                                            <FontAwesomeIcon className={cx("icon-header")} icon={faCircleXmark} />
                                            Trang cá nhân
                                        </Link>
                                    </li>
                                    <li onClick={handleLogout} className="tm-nav-item">
                                        <Link to="/" className="tm-nav-link">
                                            <FontAwesomeIcon className={cx("icon-header")} icon={faCircleXmark} />
                                            Logout
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <li
                                    onClick={handleVisibleModal}
                                    style={{
                                        cursor: "pointer",
                                    }}
                                    className="tm-nav-item"
                                >
                                    <div className="tm-nav-link">
                                        <FontAwesomeIcon icon={faUsers} />
                                        đăng nhập / đăng kí
                                    </div>
                                </li>
                            )}

                            {visibleModal == true ? (
                                <div className={cx("wrapper")}>
                                    <div className={cx("modal")}>
                                        <button onClick={handleVisibleModal}>
                                            <i>close</i>
                                        </button>
                                        <div>
                                            <div className={cx("modal-wrapper")}>
                                                <h2
                                                    className={cx("modal-heading-item")}
                                                    onClick={(e) => setStateHeadingModal("login")}
                                                >
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
                        </ul>
                    </nav>
                </div>
                {/* <Footer /> */}
            </header>
            <div className="container-fluid">
                <main className="tm-main">
                    <Search />
                </main>
            </div>
        </>
    );
}

export default Header;
