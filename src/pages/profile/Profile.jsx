import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import UserService from "~/core/services/user/user.service.ts";
import Cookies from "js-cookie";
import Styles from "./profile.module.scss";

const cx = classNames.bind(Styles);
function Profile() {
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [user, setUser] = useState([]);
    const [postsPerPage] = useState(10);
    const navigate = useNavigate();

    useEffect(() => {
        const userId = Cookies.get("UserId");
        const data = async () => {
            const userService = UserService.getInstance();
            const response = await userService.Profile(userId);
            setLoading(false);
            if (response.status === 200) {
                setUser(response.data);
            }
        };
        data();
    }, [currentPage]);

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = user.slice(indexOfFirstPost, indexOfLastPost);
    // Change page
    const paginate = (currentPage) => setCurrentPage(currentPage);

    const handleChangePage = (e) => {
        console.log("currentPage : ", currentPage);
        if (e.target.textContent === "Prev" && currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
        if (e.target.textContent === "Next" && currentPage < 4) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    return (
        <div className={cx("profile")}>
            <div className={cx("information_user")}>
                
            </div>
            <div className={cx("list-post")}></div>
        </div>
    );
}

export default Profile;
