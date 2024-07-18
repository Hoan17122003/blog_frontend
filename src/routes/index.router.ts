import Login from "~/components/login/Login";
import DefaultLayout from "~/components/layout/defaultlayout/DefaultLayout";
import News from "~/pages/new/News";
import Validate from "~/components/layout/validatelayout/Validate";

export const publicRoutes = [
    {
        path: "/validate-email",
        component: Validate,
        layout: Validate,
    },
    {
        path: "/news",
        component: News,
        layout: DefaultLayout,
    },
    {
        path: "/",
        component: null,
        layout: DefaultLayout,
    },
    // {
    //     path: "/",
    //     component: Home,
    // },
    // { path: "auth/login", component: "render login page" },
    // { path: "" },
];

// private routes
export const privateRoutes = [];
