import { Link } from "react-router-dom";
import Styles from "./ArticlesItem.module.scss";
import classNames from "classnames/bind";
import { memo } from "react";

const cx = classNames.bind(Styles);
function ArticlesItem({ data }) {
    let tag;

    if (data.tag.length > 0) {
        tag = data.tag.map((element) => element["tag_name"]).join(",");
    }
    return (
        <Link
            onClick={() => window.location.reload()}
            to={`/ArticlesItem-detail/${data.post_id}`}
            className={cx("wrapper")}
        >
            <div className={cx("articles-info")}>
                <div className="articles-name">
                    <span>Tên bài viết: {data["post_name"]}</span>
                </div>
                <div className="articles-content">
                    <article>
                        {data["post_content"].length > 30 ? (
                            <p>{data["post_content"].slice(0, 30)}...</p>
                        ) : (
                            <p>{data["post_content"]}</p>
                        )}
                    </article>
                </div>
                <div className="name_tag">
                    <span className={cx("tag")}>tag : {tag}</span>
                </div>
                <div>
                    <span>category : a</span>
                </div>
                <div className={cx("user-wirte")}>
                    <span>Người viết :{`${data["user_wirte"].fullname}-${data["user_wirte"]["email"]}`}</span>
                </div>
            </div>
        </Link>
        // <></>
    );
}

export default memo(ArticlesItem);
