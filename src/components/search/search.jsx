import { useState, useEffect, useRef, useMemo, useCallback, useLayoutEffect } from "react";
import Tippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faSpinner, faMagnifyingGlass, faSearch } from "@fortawesome/free-solid-svg-icons";
import AccountItem from "~/components/accountItem/AccountItem";
import { Wrapper as PopperWrapper, Menu as PoperMenu } from "~/components/poper/index";
import styles from "./search.module.scss";
import { searchAPI } from "~/core/services";
import debounce from "lodash.debounce";
import ArticlesItem from "../articlesitem/ArticlesItem";
import { Link, useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [showResults, setShowResults] = useState(true);
    const [loading, setLoading] = useState(false);
    const [filter, setfilter] = useState("user");
    const [currentPage, setCurrentPage] = useState(1);
    const [flag, setFlag] = useState(true);

    const inputRef = useRef();
    const handleNotReRender = useMemo(() => {});

    const handleClear = () => {
        setSearchValue("");
        setSearchResult([]);
        inputRef.current.focus();
    };
    const handleHideResult = () => {
        setShowResults(false);
    };

    const debouncedSearch = useCallback(
        debounce(async (value) => {
            if (value) {
                setLoading(true);
                try {
                    let api = () =>
                        searchAPI(value, filter, currentPage)
                            .then(async (data) => {
                                if (data.status == 200) {
                                    data = await data.data;
                                    return data;
                                }
                                // Promise.reject(() => {});
                            })
                            .then((data) => {
                                data.data.forEach((element) => {
                                    if (element.avatar) {
                                        element.avatar = `http://localhost:8080/${element.avatar}`;
                                    }
                                });
                                setSearchResult(data.data);
                                setLoading(false);
                            })
                            .catch(() => {
                                setLoading(false);
                            });
                    api();
                } catch (error) {
                    console.error("Error fetching search results:", error);
                } finally {
                    setLoading(false);
                }
            }
        }, 1000), // 1000ms = 1 second delay
        [filter]
    );
    const navigator = useNavigate();

    const handleSearchMore = () => {
        const location = window.location.href;
        const url = location.split("/");
        if (url[url.length - 1] === "search") {
        } else {
            navigator("/search");
        }
        setFlag((prev) => !prev);
    };
    // console.log("searchReulst : ", searchResult);
    // console.log("currentpage : ", currentPage);

    const handlefilter = (value) => {
        setfilter(value);
        setCurrentPage(1);
    };

    useEffect(() => {
        if (!searchValue.trim()) {
            setSearchResult([]);
            return;
        }
        setLoading(true);
        console.log("filter : ", filter);

        debouncedSearch(searchValue);
    }, [searchValue, filter]);

    return (
        <Tippy
            interactive
            visible={showResults && searchResult.length > 0 && flag}
            render={(attrs) => (
                <div className={cx("search-result")} tabIndex="-1" {...attrs}>
                    {showResults && (
                        <PopperWrapper>
                            <div className={cx("filter")}>
                                <div
                                    className={cx("wrapper-title", {
                                        "text-decorator": filter === "user" ? true : false,
                                    })}
                                    onClick={() => handlefilter("user")}
                                >
                                    <h4 className={cx("search-title")}>accounts</h4>
                                </div>
                                <div
                                    className={cx("wrapper-title", {
                                        "text-decorator": filter === "page" ? true : false,
                                    })}
                                    onClick={() => handlefilter("page")}
                                >
                                    <h4 className={cx("search-title")}>articles</h4>
                                </div>
                            </div>
                            {filter === "user"
                                ? searchResult.map((value) => <AccountItem data={value} key={value.id} />)
                                : searchResult.map((value) => {
                                      if (value?.["post_id"]) {
                                          return <ArticlesItem data={value} key={value.id} />;
                                      }
                                      return <p>loadding...</p>;
                                  })}
                            <div onClick={handleSearchMore} className={cx("search-result-more")}>
                                <span>more</span>
                            </div>
                        </PopperWrapper>
                    )}
                </div>
            )}
            onClickOutside={handleHideResult}
        >
            <div className={cx("search")}>
                <div className="row tm-row">
                    <div className="col-12">
                        <div className="form-inline tm-mb-80 tm-search-form">
                            <input
                                className="form-control tm-search-input"
                                name="query"
                                type="text"
                                placeholder="Search..."
                                aria-label="Search"
                                ref={inputRef}
                                value={searchValue}
                                spellCheck={false}
                                onChange={(e) => setSearchValue(e.target.value)}
                                onFocus={() => {
                                    setShowResults(true);
                                    setFlag(true);
                                }}
                            />
                            {!!searchValue & !loading && (
                                <button className={cx("clear")} onClick={handleClear}>
                                    <FontAwesomeIcon icon={faCircleXmark} />
                                </button>
                            )}
                            {loading && <FontAwesomeIcon className={cx("loading")} icon={faSpinner} />}
                            <button className="tm-search-button" type="submit">
                                <FontAwesomeIcon className="tm-search-icon fas" icon={faSearch} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Tippy>
    );
}

export default Search;
