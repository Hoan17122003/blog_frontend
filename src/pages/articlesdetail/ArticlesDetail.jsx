import { useEffect, useState, createContext, memo } from "react";
import { PostSerivce } from "~/core/services/post/post.service.ts";
import { useSearchParams, useParams, Link } from "react-router-dom";
import classNames from "classnames/bind";
import Styles from "./artickesdetail.module.scss";
import CommentSection from "~/components/comment/Comment";
import Cookies from "js-cookie";
import UserService from "~/core/services/user/user.service.ts";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export const PostIdContext = createContext();

const cx = classNames.bind(Styles);
function ArticlesDetail({ onData }) {
    const [articlesContent, setArticlesContent] = useState("");
    const [articlesName, setArticlesName] = useState("");
    const { post_id } = useParams();
    const [commentList, setCommentList] = useState([]);
    const [userWrite, setUserWrite] = useState([]);
    const [isFollow, setIsFollow] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const postService = PostSerivce.GetInstance();
            const response = await postService.GetPostDetail(post_id);
            setArticlesContent(response.data.data["post_content"]);
            setArticlesName(response.data.data["post_name"]);
            setUserWrite(response.data.data["user_wirte"]);
            setCommentList(response.data.data.comments);
            const UserId = Cookies.get("UserId");
            const check = response.data.data["user_wirte"].followers.includes(UserId);
            setIsFollow(check);
            onData({ categoryChild: response.data.data["categories"], tagChild: response.data.data["tag"] });
            // console.log("check : ", check);
        };
        fetchData();
    }, []);
    const handleFollow = () => {
        const UserId = Cookies.get("UserId");
        console.log("UserId : ", UserId);
        if (UserId) {
            const userService = UserService.getInstance();
            const response = userService.Follow(userWrite.user_id);
            console.log(response);
            alert("theo dõi người dùng thành công");
        } else {
            alert("Vui lòng đăng nhập để theo dõi người dùng");
        }
    };
    const handleUnFollow = () => {
        alert("test : ....");
    };
    const follow = () => {
        const userId = Cookies.get("UserId");
        console.log("userId : ", userId);
        if (userId === userWrite.user_id) return <></>;
        if (isFollow) {
            return <div onClick={handleUnFollow}>huỷ theo dõi</div>;
        }
        return (
            <div className={cx('follow_icon')} onClick={handleFollow}>
                <FontAwesomeIcon icon={faPlus} />
            </div>
        );
    };

    return (
        <div className={cx("wrapper")}>
            <div className={cx("information_basic")}>
                <div className={cx("Information_UserWrite_avatar")}>
                    <Link class={cx("avatar-container")} to={`/profile/${userWrite.user_id}`}>
                        <img
                            className={cx("Information_UserWrite_avatar_img")}
                            src={`http://localhost:8080/${userWrite.avatar || ""}`}
                            alt="image"
                        />
                    </Link>
                </div>
                <div className={cx("Information_UserWrite_content")}>
                    <div className={cx("Information_UserWrite_content_fullname")}>
                        <Link to={`/profile/${userWrite.user_id}`}>{userWrite.fullname}</Link>{" "}
                    </div>
                    <div className={cx("Information_UserWrite_content_email")}>{userWrite.email}</div>
                    {follow()}
                </div>
            </div>
            <div className={cx("Article-Name")}>
                <h1>{articlesName}</h1>
            </div>
            <div className={cx("Articles-Content")}>
                <div dangerouslySetInnerHTML={{ __html: articlesContent }} />
            </div>
            <h4>Bình luận</h4>
            <div className={cx("comment")}>
                {/* Comment List */}
                <PostIdContext.Provider value={post_id}>
                    <div className={cx("comment_list")}>{<CommentSection comments={commentList} />}</div>
                </PostIdContext.Provider>
            </div>
        </div>
    );
}

export default memo(ArticlesDetail);
