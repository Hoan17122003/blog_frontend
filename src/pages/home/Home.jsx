import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";

import { PostSerivce } from "~/core/services/post/post.service.ts";
import Image from "~/components/image/Image";
import Styles from "./home.module.scss";

const cx = classNames.bind(Styles);

function Home() {
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [posts, setPosts] = useState([]);
    const [postsPerPage] = useState(10);
    const navigate = useNavigate();

    useEffect(() => {
        const listPost = async () => {
            const postService = PostSerivce.GetInstance();
            const post = await postService.GetPostList(10, currentPage);
            setLoading(false);
            if (post.status === 200) {
                setPosts(post.data);
            }
        };
        listPost();
    }, [currentPage]);

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
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
        <>
            <div className="row tm-row">
                {
                    // posts &
                    posts.map((element, index) => {
                        if (element.images.length > 0) {
                            // console.log("url : ", element.images[0].url);
                        }
                        return (
                            <article key={index} className="col-12 col-md-6 tm-post">
                                <hr className="tm-hr-primary" />
                                <Link
                                    to={`/ArticlesItem-detail/${element.post_id}`}
                                    className="effect-lily tm-post-link tm-pt-60"
                                >
                                    <div className="tm-post-link-inner">
                                        <Image
                                            src={`http://localhost:8080/${element.images[0]?.url || null}`}
                                            alt="Image"
                                            className="img-fluid"
                                        />
                                    </div>
                                    <span className="position-absolute tm-new-badge">New</span>
                                    <h2 className="tm-pt-30 tm-color-primary tm-post-title">{element["post_name"]}</h2>
                                </Link>
                                {/* <p className="tm-pt-30">{element.post_title}</p> */}
                                <div className="d-flex justify-content-between tm-pt-45">
                                    <span className="tm-color-primary">
                                        Danh Mục:{" "}
                                        <Link to={`/category/${element.categories.category_name}`}>
                                            {element.categories.category_name}
                                        </Link>
                                    </span>
                                    <span className="tm-color-primary">
                                        {new Date(element.post_date).toLocaleString("vi")}
                                    </span>
                                </div>
                                <div className={cx("tag")}>
                                    <span>
                                        {element.tag.map((element, index) => (
                                            <Link key={index} to={`/tag/@${element.tag_name}`}>
                                                #{element.tag_name}
                                            </Link>
                                        ))}
                                    </span>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between">
                                    <span className={cx("wrapper")}>
                                        <Link to={`/profile/${element["user_id"]}`}>
                                            <img
                                                className={cx("wrapper-img")}
                                                src={`http://localhost:8080/${element["user_wirte"].avatar || " "}`}
                                                alt="images"
                                            />
                                        </Link>
                                    </span>
                                    <span className={cx("lineheight")}>{element["user_wirte"].fullname}</span>
                                    <span
                                        className={cx("email", "lineheight")}
                                        onClick={() => navigate(`/profile/${element["user_id"]}`)}
                                    >
                                        {element["user_wirte"].email}
                                    </span>
                                </div>
                            </article>
                        );
                    })
                }
                <div className="row tm-row tm-mt-100 tm-mb-75">
                    <div className="tm-prev-next-wrapper">
                        <div
                            onClick={handleChangePage}
                            className={`mb-2 tm-btn tm-btn-primary tm-prev-next ${
                                currentPage === 1 ? "disabled" : ""
                            } tm-mr-20`}
                        >
                            Prev
                        </div>
                        <div
                            onClick={handleChangePage}
                            className={`mb-2 tm-btn tm-btn-primary tm-prev-next ${
                                currentPage === 4 ? "disabled" : ""
                            } tm-mr-20`}
                        >
                            Next
                        </div>
                    </div>
                    <div className="tm-paging-wrapper">
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
                    </div>
                </div>
            </div>
            ;
        </>
    );
}

export default Home;
