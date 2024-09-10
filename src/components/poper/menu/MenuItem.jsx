import { useContext, useEffect } from "react";
import Button from "~/components/button/Button.jsx";
import classNames from "classnames/bind";
import Styles from "./menu.module.scss";

const cx = classNames.bind(Styles);

function MenuItem({ data, onCLick }) {
    const classes = cx("menu-item", {
        separate: data.separate,
    });
    return (
        <Button
            menu_shadow
            classes={classes}
            style={{
                width: "100%",
                textAlign: "left",
                marginLeft: "0px",
                display: "inline-block",
                padding: "10px 0px",
            }}
            to={data.to}
            leftIcon={data.icon}
            onClick={onCLick}
        >
            {data.title}
        </Button>
    );
}

export default MenuItem;
