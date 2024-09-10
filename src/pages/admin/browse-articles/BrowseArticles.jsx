import { Navigate } from "react-router-dom";

function BrowseArticles() {
    const role = JSON.parse(localStorage.getItem("role"));
    if (role !== "admin") return <Navigate to={"/"} />;
    return <>admin page</>;
}

export default BrowseArticles;
