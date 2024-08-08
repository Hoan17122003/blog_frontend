import classNames from "classnames/bind";
import Styles from "./Button.module.scss";
import { Link } from "react-router-dom";
import { Fragment } from "react";

const cx = classNames.bind(Styles);

function Button({
    to,
    href,
    primary,
    outline,
    small,
    text,
    rounded,
    disable,
    large,
    leftIcon,
    classes,
    rightIcon,
    menu_shadow,
    children,
    onClick,
    ...passProps
}) {
    let Comp = "button";
    const props = {
        onClick,
        ...passProps,
    };
    if (disable) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith("on") && typeof props[key] === "function") {
                delete props[key];
            }
        });
    }
    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = "a";
    }
    const classese = cx("wrapper", {
        primary,
        outline,
        small,
        large,
        text,
        disable,
        rounded,
        menu_shadow,
    });
    return (
        <Comp className={cx(classese, classes ? classes : " ")} {...props}>
            {leftIcon && <span className={cx("icon")}>{leftIcon} </span>}
            <span className={cx("title")}>{children}</span>
            {rightIcon && <span className={cx("icon")}>{rightIcon}</span>}
        </Comp>
    );
}

export default Button;
