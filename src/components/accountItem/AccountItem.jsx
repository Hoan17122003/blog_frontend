import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark, faSpinner, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import Styles from "./AccountItem.module.scss";
import Image from "~/components/image/Image.jsx";
import { Fragment, memo } from "react";

const cx = classNames.bind(Styles);

function AccountItem({ data }) {
    return (
        <a href={`/profile/${data.user_id}`} className={cx("wrapper")}>
            <Image className={cx("avatar")} src={data.avatar} alt="images" />
            <div className={cx("info")}>
                <h4 className={cx("name")}>
                    <span>{data.fullname}</span>
                </h4>
                <span className={cx("username")}>{data.email}</span>
            </div>
        </a>
    );
}

export default memo(AccountItem);
