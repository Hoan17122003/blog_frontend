import Login from "~/components/login/Login";
import DefaultLayout from "~/components/layout/defaultlayout/DefaultLayout";
import { Route, redirect } from "react-router-dom";
import News from "~/pages/new/News";
import Validate from "~/components/layout/validatelayout/Validate";
import ForgetPassword from "~/components/forgetpassword/Forgetpassword";
import Profile from "~/pages/profile/Profile";
import Home from "~/pages/home/Home";
import SearchPage from "~/pages/search/SearchPage";
import Post from "~/pages/post/Post";
import Following from "~/pages/following/Following";
import Content from "~/pages/content/Content";
import { Component } from "react";
import Cookies from "js-cookie";
import BrowseArticles from "~/pages/admin/browse-articles/BrowseArticles";

export const publicRoutes = [
    {
        path: "/",
        component: Home,
        layout: undefined,
    },
    {
        path: "/Home",
        component: Home,
        layout: undefined,
    },
    {
        // search more content
        path: "search",
        component: SearchPage,
    },
    {
        path: "/validate-email",
        component: Validate,
        layout: null,
    },
    {
        // vissiable page following
        path: "/Following",
        component: Following,
        layout: undefined,
    },
    {
        path: "/forgetpassword",
        component: ForgetPassword,
        layout: null,
    },
    {
        path: "/profile",
        component: Profile,
        layout: undefined,
    },
    {
        // vissiable profile search and user_wirte content
        path: "profile/:user_id",
        component: Profile,
        layout: undefined,
    },
    {
        // create ariticles
        path: "/me/post",
        component: Post,
        layout: undefined,
    },
    {
        // vissiable articles detail
        path: "/ArticlesItem-detail/:post_id",
        component: Content,
        layout: undefined,
    },
    {
        // filter of tag
        //TODO : do something
        path: "/tag/:TagName",
        component: Content,
        layout: undefined,
    },
    {
        // filter of categoty
        //TODO : do something
        path: "/category/:CategoryName",
        component: Content,
        layout: undefined,
    },
    {
        path: '/browse-articles',
        component: BrowseArticles,
        layout: undefined
    }
];

// Dummy authentication check function


// // Wrapper for public routes
// export const PublicRoute = ({ Component, Layout, ...rest }) => {
//     return (
//         <Route
//             {...rest}
//             element={
//                 (
//                     <Layout>
//                         <Component />
//                     </Layout>
//                 )
//             }
//         />
//     );
// };

// // Wrapper for private routes
// export const PrivateRoute = ({ Component, Layout, ...rest }) => {
//     return (
//         <Route
//             {...rest}
//             element={
//                 isAuthenticated() ? (
//                     Layout ? (
//                         <Layout>
//                             <Component />
//                         </Layout>
//                     ) : (
//                         <Component />
//                     )
//                 ) : (
//                     <Navigate to="/login" />
//                 )
//             }
//         />
//     );
// };
// private routes
export const privateRoutes = [

];
