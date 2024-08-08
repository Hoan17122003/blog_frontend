import ArticlesDetail from "../articlesdetail/ArticlesDetail";
import classNames from "classnames/bind";
import Styles from "./content.module.scss";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";

const cx = classNames.bind(Styles);
function Content() {
    const [category, setCategory] = useState({});
    const [tag, setTag] = useState([]);

    const handleDataFormChild = useCallback(({ categoryChild, tagChild }) => {
        setCategory(categoryChild);
        setTag(tagChild);
    }, []);

    return (
        <div className={cx("wrapper")}>
            <ArticlesDetail onData={handleDataFormChild} />
            {/* Add category and post other components here */}
            <div className={cx("category-RelatedPost")}>
                <div className={cx("category")}>
                    <hr />
                    <h2>Category</h2>
                    <Link to={`/${category.category_name}`} className={cx("category-list")}>
                        {category.category_name}
                    </Link>
                    <hr />
                    <h2>Tag</h2>
                    <div>
                        {tag.map((element) => {
                            return <Link to={`/${element.tag_name}`}>{element.tag_name}</Link>;
                        })}
                    </div>
                </div>
                <div className={cx("related-post")}>
                    <hr />
                    <h2>Related Post</h2>
                </div>
            </div>
        </div>
    );
}

export default Content;
