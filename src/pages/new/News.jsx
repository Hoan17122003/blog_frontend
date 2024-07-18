import classNames from "classnames/bind";
import Styles from "./news.module.scss";

const cx = classNames.bind(Styles);
function News() {
    const access_token = JSON.parse(localStorage.getItem("access_token"));
    if (!access_token ) alert("bạn chưa đăng nhập");
    return <div className={cx("news")}>hehehe</div>;
}

export default News;
