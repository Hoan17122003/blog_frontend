// import React, { forwardRef, memo, useContext, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./comment.module.scss"; // Import your custom CSS here
// import Cookies from "js-cookie";
// import CommentService from "~/core/services/comment/Comment.service.ts";
// import { PostIdContext } from "~/pages/articlesdetail/ArticlesDetail";

// const CommentSection = ({ comments }) => {
//     const [commentContent, setCommentContent] = useState("");
//     const postId = useContext(PostIdContext);
//     const [commentContentReply, setCommentContentReply] = useState("");
//     const [replyingTo, setReplyingTo] = useState(null);

//     const handleCommentChange = (event) => {
//         setCommentContent(event.target.value);
//     };

//     const handleCommentSubmit = (event) => {
//         event.preventDefault();
//         const commentService = new CommentService();
//         const response = commentService.CreateComment(commentContent, postId);
//         setCommentContent("");
//     };
//     const handleRemoveComment = (commentId) => {
//         alert("hehehe");
//         console.log("commentId : ", commentId);
//         // comments.filter((comment) => comment.id !== commentId);
//     };

//     return (
//         <>
//             <div style={{ backgroundColor: "#f7f6f6" }} className="container my-5 py-5 text-body">
//                 <div className="row d-flex justify-content-center">
//                     <div className="col-md-12 col-lg-10 col-xl-8">
//                         <div className="card mb-3">
//                             <div className="card-body">
//                                 <form onSubmit={handleCommentSubmit}>
//                                     <div className="information_user">
//                                         <div className="information_user_avatar"></div>
//                                         <div className="information_user_fullname"></div>
//                                     </div>
//                                     <div className="form-group">
//                                         <label htmlFor="comment">Leave a comment:</label>
//                                         <textarea
//                                             id="comment"
//                                             className="form-control"
//                                             rows="3"
//                                             value={commentContent}
//                                             onChange={handleCommentChange}
//                                             style={{ wordWrap: "break-word" }}
//                                         ></textarea>
//                                     </div>
//                                     <button type="submit" className="btn btn-primary mt-3">
//                                         Submit
//                                     </button>
//                                 </form>
//                             </div>
//                         </div>
//                         {comments.map((comment) => {
//                             const parentComment = comments.find((c) => c.comment_id === comment.parent?.comment_id);

//                             return (
//                                 <div
//                                     style={{
//                                         borderLeft: "1px solid",
//                                         boxShadow: "1px 2px 3px gray",
//                                         marginLeft: parentComment ? "20px" : "0px",
//                                     }}
//                                     key={comment.comment_id}
//                                     className="card mb-3"
//                                 >
//                                     <div className="card-body">
//                                         {parentComment ? (
//                                             <strong>
//                                                 <div>
//                                                     Reply to :{" "}
//                                                     <Link to={`/profile/${parentComment.user["user_id"]}`}>
//                                                         {parentComment.user.fullname}
//                                                     </Link>{" "}
//                                                     <span>{parentComment.content}</span>{" "}
//                                                 </div>
//                                             </strong>
//                                         ) : (
//                                             " "
//                                         )}
//                                         <div className="d-flex flex-start">
//                                             <Link to={`/profile/${comment.user.user_id}`}>
//                                                 <img
//                                                     className="rounded-circle shadow-1-strong me-3"
//                                                     src={`http://localhost:8080/${comment.user.avatar}`}
//                                                     alt="avatar"
//                                                     width="40"
//                                                     height="40"
//                                                     style={{ marginRight: "5px" }}
//                                                 />
//                                             </Link>
//                                             <div className="w-100">
//                                                 <div className="d-flex justify-content-between align-items-center mb-3">
//                                                     <h6 className="text-primary fw-bold mb-0">
//                                                         <span
//                                                             className="text-body ms-2"
//                                                             style={{ wordWrap: "break-word" }}
//                                                         >
//                                                             <Link to={`/profile/${comment.user.user_id}`}>
//                                                                 <span className="text-primary">
//                                                                     {comment.user.fullname}{" "}
//                                                                 </span>
//                                                             </Link>
//                                                             <span
//                                                                 style={{
//                                                                     marginRight: "10px",
//                                                                     wordWrap: "break-word",
//                                                                 }}
//                                                                 className="text-primary"
//                                                             >
//                                                                 - {comment.user.email}
//                                                             </span>
//                                                             <span style={{ wordWrap: "break-word" }}>
//                                                                 <p
//                                                                     style={{
//                                                                         width: "485px",
//                                                                     }}
//                                                                 >
//                                                                     {comment.content}
//                                                                 </p>
//                                                             </span>
//                                                         </span>
//                                                     </h6>
//                                                     <p
//                                                         style={{
//                                                             minWidth: "130px",
//                                                         }}
//                                                         className="mb-0"
//                                                     >
//                                                         {new Date(comment.comment_date).toLocaleString("vi")}
//                                                     </p>
//                                                 </div>
//                                                 <div className="d-flex justify-content-between align-items-center">
//                                                     <p className="small mb-0" style={{ color: "#aaa" }}>
//                                                         {JSON.parse(localStorage.getItem("role")) == "admin" ||
//                                                         Cookies.get("UserId") === comment.user.user_id ? (
//                                                             <div
//                                                                 onClick={async (e) => {
//                                                                     e.preventDefault();
//                                                                     console.log(comment.comment_id);
//                                                                     const commentId = comment.comment_id;
//                                                                     const commentService = new CommentService();
//                                                                     const response = await commentService.RemoveComment(
//                                                                         postId,
//                                                                         commentId
//                                                                     );
//                                                                     location.reload();
//                                                                 }}
//                                                             >
//                                                                 <Link className="link-grey">Remove •</Link>
//                                                             </div>
//                                                         ) : (
//                                                             ""
//                                                         )}{" "}
//                                                         <div
//                                                             onClick={(e) => {
//                                                                 e.preventDefault();
//                                                                 setReplyingTo(comment.comment_id);
//                                                             }}
//                                                         >
//                                                             <Link className="link-grey">Reply •</Link>
//                                                         </div>
//                                                     </p>
//                                                     <div className="d-flex flex-row">
//                                                         <i className="far fa-check-circle text-primary"></i>
//                                                     </div>
//                                                 </div>
//                                                 {replyingTo === comment.comment_id && (
//                                                     <div className="card mb-3">
//                                                         <div className="card-body">
//                                                             <form
//                                                                 onSubmit={async (e) => {
//                                                                     e.preventDefault();
//                                                                     const commentService = new CommentService();
//                                                                     const response = await commentService.ReplyComment(
//                                                                         commentContentReply,
//                                                                         postId,
//                                                                         comment.comment_id
//                                                                     );

//                                                                     // window.location.reload();
//                                                                     setReplyingTo(null);
//                                                                     setCommentContentReply("");
//                                                                 }}
//                                                             >
//                                                                 <div className="information_user">
//                                                                     <div className="information_user_avatar"></div>
//                                                                     <div className="information_user_fullname"></div>
//                                                                 </div>
//                                                                 <div className="form-group">
//                                                                     <label htmlFor="comment">Reply a comment:</label>
//                                                                     <textarea
//                                                                         id="comment"
//                                                                         className="form-control"
//                                                                         rows="3"
//                                                                         value={commentContentReply}
//                                                                         onChange={handleCommentChange}
//                                                                         style={{ wordWrap: "break-word" }}
//                                                                     ></textarea>
//                                                                 </div>
//                                                                 <button type="submit" className="btn btn-primary mt-3">
//                                                                     Submit
//                                                                 </button>
//                                                             </form>
//                                                         </div>
//                                                     </div>
//                                                 )}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default memo(CommentSection);

import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./comment.module.scss"; // Import your custom CSS here
import Cookies from "js-cookie";
import CommentService from "~/core/services/comment/Comment.service.ts";
import { PostIdContext } from "~/pages/articlesdetail/ArticlesDetail";

const CommentSection = ({ comments }) => {
    const [commentContent, setCommentContent] = useState("");
    const postId = useContext(PostIdContext);
    const [commentContentReply, setCommentContentReply] = useState("");
    const [replyingTo, setReplyingTo] = useState(null);

    const handleCommentChange = (event) => {
        setCommentContent(event.target.value);
    };

    const handleCommentSubmit = async (event) => {
        event.preventDefault();
        const commentService = new CommentService();
        await commentService.CreateComment(commentContent, postId);
        setCommentContent("");
        // You may want to refresh comments list or update state
    };

    const handleRemoveComment = async (commentId) => {
        const commentService = new CommentService();
        await commentService.RemoveComment(postId, commentId);
        // You may want to refresh comments list or update state
    };

    const handleReplyChange = (event) => {
        setCommentContentReply(event.target.value);
    };

    return (
        <div style={{ backgroundColor: "#f7f6f6" }} className="container my-5 py-5 text-body">
            <div className="row d-flex justify-content-center">
                <div className="col-md-12 col-lg-10 col-xl-8">
                    <div className="card mb-3">
                        <div className="card-body">
                            <form onSubmit={handleCommentSubmit}>
                                <div className="information_user">
                                    <div className="information_user_avatar"></div>
                                    <div className="information_user_fullname"></div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="comment">Leave a comment:</label>
                                    <textarea
                                        id="comment"
                                        className="form-control"
                                        rows="3"
                                        value={commentContent}
                                        onChange={handleCommentChange}
                                        style={{ wordWrap: "break-word" }}
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary mt-3">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                    {comments.map((comment) => {
                        const parentComment = comments.find((c) => c.comment_id === comment.parent?.comment_id);

                        return (
                            <div
                                style={{
                                    borderLeft: "1px solid",
                                    boxShadow: "1px 2px 3px gray",
                                    marginLeft: parentComment ? "20px" : "0px",
                                }}
                                key={comment.comment_id}
                                className="card mb-3"
                            >
                                <div className="card-body">
                                    {parentComment && (
                                        <strong>
                                            <div>
                                                Reply to:{" "}
                                                <Link to={`/profile/${parentComment.user["user_id"]}`}>
                                                    {parentComment.user.fullname}
                                                </Link>{" "}
                                                <span>{parentComment.content}</span>{" "}
                                            </div>
                                        </strong>
                                    )}
                                    <div className="d-flex flex-start">
                                        <Link to={`/profile/${comment.user.user_id}`}>
                                            <img
                                                className="rounded-circle shadow-1-strong me-3"
                                                src={`http://localhost:8080/${comment.user.avatar}`}
                                                alt="avatar"
                                                width="40"
                                                height="40"
                                                style={{ marginRight: "5px" }}
                                            />
                                        </Link>
                                        <div className="w-100">
                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                <h6 className="text-primary fw-bold mb-0">
                                                    <span className="text-body ms-2" style={{ wordWrap: "break-word" }}>
                                                        <Link to={`/profile/${comment.user.user_id}`}>
                                                            <span className="text-primary">
                                                                {comment.user.fullname}{" "}
                                                            </span>
                                                        </Link>
                                                        <span
                                                            style={{ marginRight: "10px", wordWrap: "break-word" }}
                                                            className="text-primary"
                                                        >
                                                            - {comment.user.email}
                                                        </span>
                                                        <span style={{ wordWrap: "break-word" }}>
                                                            <p style={{ width: "485px" }}>{comment.content}</p>
                                                        </span>
                                                    </span>
                                                </h6>
                                                <p style={{ minWidth: "130px" }} className="mb-0">
                                                    {new Date(comment.comment_date).toLocaleString("vi")}
                                                </p>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <p className="small mb-0" style={{ color: "#aaa" }}>
                                                    {JSON.parse(localStorage.getItem("role")) == "admin" ||
                                                    Cookies.get("UserId") === comment.user.user_id ? (
                                                        <div
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                handleRemoveComment(comment.comment_id);
                                                            }}
                                                        >
                                                            <Link className="link-grey">Remove •</Link>
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}{" "}
                                                    <div
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setReplyingTo(comment.comment_id);
                                                        }}
                                                    >
                                                        <Link className="link-grey">Reply •</Link>
                                                    </div>
                                                </p>
                                                <div className="d-flex flex-row">
                                                    <i className="far fa-check-circle text-primary"></i>
                                                </div>
                                            </div>
                                            {replyingTo === comment.comment_id && (
                                                <div className="card mb-3">
                                                    <div className="card-body">
                                                        <form
                                                            onSubmit={async (e) => {
                                                                e.preventDefault();
                                                                const commentService = new CommentService();
                                                                await commentService.ReplyComment(
                                                                    commentContentReply,
                                                                    postId,
                                                                    comment.comment_id
                                                                );
                                                                setReplyingTo(null);
                                                                setCommentContentReply("");
                                                                // You may want to refresh comments list or update state
                                                            }}
                                                        >
                                                            <div className="information_user">
                                                                <div className="information_user_avatar"></div>
                                                                <div className="information_user_fullname"></div>
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="comment">Reply a comment:</label>
                                                                <textarea
                                                                    id="comment"
                                                                    className="form-control"
                                                                    rows="3"
                                                                    value={commentContentReply}
                                                                    onChange={handleReplyChange}
                                                                    style={{ wordWrap: "break-word" }}
                                                                ></textarea>
                                                            </div>
                                                            <button type="submit" className="btn btn-primary mt-3">
                                                                Submit
                                                            </button>
                                                        </form>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CommentSection;
