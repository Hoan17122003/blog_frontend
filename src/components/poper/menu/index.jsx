import Tippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import Styles from "./menu.module.scss";
import Wrapper from "../wrapper";
import AccountItem from "~/components/accountItem/AccountItem";

import Header from "./Header";
import MenuItem from "./MenuItem";
import { useState } from "react";

const cx = classNames.bind(Styles);

const defaultFN = () => {};

function Menu({ children, items = [], onChange = defaultFN }) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];
    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;
            return (
                <MenuItem
                    data={item}
                    key={index}
                    onCLick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };

    return (
        <Tippy
            delay={[0, 700]}
            offset={[12, 8]}
            interactive
            placement="bottom-end"
            render={(attrs) => (
                <div className={cx("content")} tabIndex="-1" {...attrs}>
                    <Wrapper>
                        {history.length > 1 && (
                            <Header
                                title="language"
                                onBack={() => {
                                    setHistory((prev) => prev.slice(0, prev.length - 1));
                                }}
                            />
                        )}
                        {renderItems()}
                    </Wrapper>
                </div>
            )}
            onHide={() => setHistory((prev) => prev.slice(0, 1))}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
