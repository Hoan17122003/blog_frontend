import Styles from "./post.module.scss";
import classNames from "classnames/bind";
import { createContext, useContext, useRef } from "react";
import CKEditorComponent from "~/components/ckeditor/Editor";

const cx = classNames.bind(Styles);
function Post() {
    return (
        <>
            <CKEditorComponent />
        </>
    );
}

export default Post;
