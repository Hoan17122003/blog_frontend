import classNames from "classnames/bind";
import Styles from "./footer.module.scss";

const cx = classNames.bind(Styles);
function Footer() {
    return <div className={cx("footer")}></div>;
}

export default Footer;
