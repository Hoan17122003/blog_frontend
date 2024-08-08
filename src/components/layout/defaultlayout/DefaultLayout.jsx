import Footer from "~/components/footer/Footer";
import Header from "../header/header";
import Styles from "./defaultlayout.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(Styles);
function DefaultLayout({ children }) {
    return (
        <>
            <Header />
            <div className={cx("content")}>{children}</div>
        </>
    );
}

export default DefaultLayout;
