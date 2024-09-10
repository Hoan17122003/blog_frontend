import { Fragment, useEffect, useLayoutEffect, useState } from "react";
import "./App.css";
import Cookies from "js-cookie";
import { Routes, BrowserRouter as Router, Route, Navigate } from "react-router-dom";
import { publicRoutes, PublicRoute, PrivateRoute, privateRoutes } from "~/routes/index.router";

import DefaultLayout from "./components/layout/defaultlayout/DefaultLayout";
import AuthService from "./core/services/auth/auth.service.ts";

// import DefaultLayOut from "./components/layout/DefaultLayout";

function App() {
    +function () {
        const userId = Cookies.get("UserId");
        if (userId ?? true) {
            const access_token = JSON.parse(localStorage.getItem('token')).access_token;
            (new AuthService).GetCookie(access_token);
        }
    }
    const [token, setToken] = useState(() => {
        if (localStorage.getItem("token")) {
            return JSON.parse(localStorage.getItem("token"));
        } else {
            return null;
        }
    });

    const parseJwt = (token) => {
        try {
            const base64Url = token.split(".")[1];
            const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split("")
                    .map(function (c) {
                        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                    })
                    .join("")
            );

            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error("Invalid JWT token", error);
            return null;
        }
    };
    // console.log('accessToken : ', token.access_token, " refreshToken : ", token.refresh_token)

    // Hàm kiểm tra token còn hiệu lực hay không
    const isTokenValid = (token) => {
        const decodedToken = parseJwt(token);
        if (!decodedToken) return false;

        const currentTime = Math.floor(Date.now() / 1000); // Thời gian hiện tại tính bằng giây
        return decodedToken.exp > currentTime; // Token hợp lệ nếu thời gian hết hạn lớn hơn thời gian hiện tại
    };

    useLayoutEffect(() => {

        const fetchData = async () => {
            if (token && !isTokenValid(token.access_token)) {

                console.log('hehehe', isTokenValid(token.access_token));
                const authService = new AuthService();
                if (!token) {
                    authService.Logout();
                    return <Redirect to="/" />;
                }
                const newToken = await authService.getAccessToken(token.refresh_token);
                token.access_token = newToken.data;
                localStorage.setItem("token", JSON.stringify(token));
            }
        }
        fetchData();
    }, [token])

    const isAuthenticated = () => {

        const token = JSON.parse(localStorage.getItem('token'));
        const userId = Cookies.get('UserId');
        return token !== null;
    };

    return (
        <Router>
            <div className="App">
                <Routes>

                    {privateRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if ((route.layout === null)) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                path={route.path}
                                key={index}
                                element={
                                    isAuthenticated() ? (
                                        (
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        )
                                    ) : (
                                        <Navigate to="/" />
                                    )
                                }
                            />
                        )
                    })}
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if ((route.layout === null)) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}

                </Routes>
            </div>
        </Router>
    );
}

export default App;
