import classNames from "classnames/bind";
import Styles from "./footer.module.scss";

const cx = classNames.bind(Styles);
function Footer() {
    return (
        <div className={cx("footer")}>
            <div>
                <span>Giảng viên hướng dẫn : Lễ Nguyễn Thuỳ Nhi</span>
                <span>Người thực hiện : Hà Đức Hoàn</span>
            </div>
            <div>
                <h4>Công nghệ sử dụng</h4>
                <span>Ngôn ngữ lập trình : javascript , typescript</span>
                <span>Backend : Expressjs,Nestjs</span>
                <span>Frontend : Reactjs </span>
                <span>CSDL : Mysql,Redis</span>
                <span>trình quản lý source : docker,git</span>
            </div>
        </div>
    );
}

export default Footer;
