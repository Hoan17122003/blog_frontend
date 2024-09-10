import { useEffect, useState, memo, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import classNames from "classnames/bind";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import UserService from "~/core/services/user/user.service.ts";
import Styles from "./profile.module.scss";
import Image from "~/components/images/Image";
import AuthService from "~/core/services/auth/auth.service.ts";
import { PostSerivce } from "~/core/services/post/post.service.ts";

const cx = classNames.bind(Styles);
function Profile() {
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [user, setUser] = useState([]);
    const [postsPerPage] = useState(10);
    const [hiden, setHiden] = useState(false);
    const [flag, setFlag] = useState();
    const { user_id } = useParams(); // Lấy userId từ URL
    const [auth, setAuth] = useState();
    const [selectedPostId, setSelectedPostId] = useState(null); // state để lưu postId của bài viết muốn xoá
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const userService = UserService.getInstance();
            if (user_id) {
                const userId = Cookies.get("UserId");
                if (user_id === userId) {
                    setAuth(true);
                }
                const response = await userService.ProfileUserId(user_id);
                setLoading(false);
                setUser(response.data.data);
            } else {
                const access_token = JSON.parse(localStorage.getItem("token")).access_token;

                const response = await userService.MeProfile(access_token);
                setLoading(false);
                setUser(response.data.data);
                setAuth(response.data.flag);
            }
        };
        fetchData();
    }, [currentPage]);

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = user.slice(indexOfFirstPost, indexOfLastPost);
    // Change page
    const paginate = (currentPage) => setCurrentPage(currentPage);

    const handleChangePage = (e) => {
        if (e.target.textContent === "Prev" && currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
        if (e.target.textContent === "Next" && currentPage < 4) {
            setCurrentPage((prev) => prev + 1);
        }
    };
    const getContentInHTML = (__html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(__html, "text/html");
        const overviewContent = doc.querySelector("p").textContent;
        // const architectureContent = doc.querySelector("h2 + p").textContent;
        return overviewContent.slice(0, 500);
    };
    const handleRemoveAritcles = () => {
        if (selectedPostId) {
            // Xoá bài viết
            const fetchData = async () => {
                const access_token = JSON.parse(localStorage.getItem("token")).access_token;
                const postService = PostSerivce.GetInstance();
                const response = await postService.RemoveArticle([selectedPostId], access_token);

                if (response.status == 200 || response.status == 201) {
                    alert("xoá thành công");
                    window.location.reload();
                }
            };
            fetchData();
            // Call API xoá bài viết
            // Gọi hàm paginate để load lại trang sau khi xoá bài viết
            // setHiden(true);
        }
    };

    return (
        <>
            {loading && <h3>Loading ...</h3>}
            <div className={cx("profile")}>
                <div className={cx("information_user")}>
                    <div className={cx("image-wrapper")}>
                        <img src={`http://localhost:8080/${user[0]?.avatar}` || " "} alt="NoImage" />
                    </div>
                    <div className={cx("fullname")}>{user[0]?.fullname || undefined}</div>
                    <div className={cx("email")}>{user[0]?.email}</div>
                </div>
                <div className="option">
                    {auth && (
                        <>
                            <button
                                onClick={() => {
                                    if (auth) {
                                        navigate(`/edit-profile`);
                                    } else {
                                        navigate(`/login`);
                                    }
                                }}
                            >
                                <FontAwesomeIcon icon={faPenToSquare} />
                                Chỉnh sửa thông tin
                            </button>
                            <button
                                data-bs-toggle="modal"
                                data-bs-target="#block"
                                // onClick={() => {
                                //     // Cookies.remove("token");
                                //     // AuthService.logout();
                                //     // navigate(`/`);
                                // }}
                            >
                                Khoá tài khoản
                            </button>
                        </>
                    )}
                </div>
                <hr />
                <div className={cx("list-post")}>
                    <>
                        <div className={cx("list-post-wrapper")}>
                            {user[0]?.posts.map((element, index) => {
                                return (
                                    <div key={index} className={cx(`list-post-item`)}>
                                        <Link to={`/ArticlesItem-detail/${element.post_id}`}>
                                            <div className={cx("post_image_wrapper")}>
                                                <Image
                                                    src={`http://localhost:8080/${element?.images[0]?.url || ""}`}
                                                    alt="1 hinh anh"
                                                />
                                            </div>
                                        </Link>
                                        <div className={cx("post_content")}>
                                            <Link to={`/ArticlesItem-detail/${element.post_id}`} key={index}>
                                                <div className={cx("post_name")}>{element?.post_name}</div>
                                            </Link>
                                            <small>
                                                <span>{getContentInHTML(element.post_content)} ...</span>
                                            </small>
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "space-around",
                                                alignItems: "center",
                                            }}
                                        >
                                            <smail className={cx("post_date")}>
                                                Ngày Đăng bài:{" "}
                                                <span>{new Date(element.post_date).toLocaleString("vi") + " "}</span>
                                            </smail>
                                            {auth && (
                                                <div className={cx("icon-wrapper")}>
                                                    <FontAwesomeIcon
                                                        onClick={() => {
                                                            setHiden((prev) => !prev);
                                                            setFlag(element.post_id);
                                                        }}
                                                        className={cx("icon")}
                                                        icon={faPenToSquare}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        {auth && (
                                            <div
                                                className={cx("nav")}
                                                style={{
                                                    visibility:
                                                        hiden && flag === element.post_id ? "visible" : "hidden",
                                                }}
                                            >
                                                <ul>
                                                    <li>
                                                        <Link onClick={() => setSelectedPostId(element.post_id)}>
                                                            <div data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                                xoá bài viết
                                                            </div>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to={`/edit-articles/${element.post_id}`}>
                                                            chỉnh sửa bài viết
                                                        </Link>{" "}
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* data-bs-toggle="modal" data-bs-target="#exampleModal" */}
                        {/* modal xoá bài viết */}
                        <div
                            class="modal fade"
                            id="exampleModal"
                            tabindex="-1"
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                        >
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h4 class="modal-title fs-5" id="exampleModalLabel">
                                            Bạn có muốn xoá bài viết này?
                                        </h4>
                                        <button
                                            type="button"
                                            class="btn-close"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                        >
                                            &times;
                                        </button>
                                    </div>
                                    {/* <div class="modal-body">...</div> */}
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                            Close
                                        </button>
                                        <button onClick={handleRemoveAritcles} type="button" class="btn btn-primary">
                                            Save changes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* modal khoá tài khoản */}
                        <div
                            class="modal fade"
                            id="block"
                            tabindex="-1"
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                        >
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="exampleModalLabel">
                                            Bạn muốn xoá tài khoản
                                        </h1>
                                        <button
                                            type="button"
                                            class="btn-close"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                        >
                                            &times;
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        khi bạn thực hiện hành động này tài khoản của bạn sẽ khoá tạm thời{" "}
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                            Close
                                        </button>
                                        <button type="button" class="btn btn-primary">
                                            Save changes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="tm-paging-wrapper">
                            {user[0]?.posts.length > 0 ? (
                                <>
                                    <span className="d-inline-block mr-3">Page</span>
                                    <nav className="tm-paging-nav d-inline-block">
                                        <ul>
                                            <li
                                                onClick={() => setCurrentPage(1)}
                                                className={`tm-paging-item ${currentPage === 1 ? "active" : ""}`}
                                            >
                                                <div className="mb-2 tm-btn tm-paging-link">1</div>
                                            </li>
                                            <li
                                                onClick={() => setCurrentPage(2)}
                                                className={`tm-paging-item ${currentPage === 2 ? "active" : ""}`}
                                            >
                                                <div className="mb-2 tm-btn tm-paging-link">2</div>
                                            </li>
                                            <li
                                                onClick={() => setCurrentPage(3)}
                                                className={`tm-paging-item ${currentPage === 3 ? "active" : ""}`}
                                            >
                                                <div className="mb-2 tm-btn tm-paging-link">3</div>
                                            </li>
                                            <li
                                                onClick={() => setCurrentPage(4)}
                                                className={`tm-paging-item ${currentPage === 4 ? "active" : ""}`}
                                            >
                                                <div className="mb-2 tm-btn tm-paging-link">4</div>
                                            </li>
                                        </ul>
                                    </nav>
                                </>
                            ) : (
                                <p>Bạn chưa đăng bài viết nào</p>
                            )}
                        </div>
                    </>
                </div>
            </div>
        </>
    );
}

export default memo(Profile);
