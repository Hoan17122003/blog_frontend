import { Fragment } from "react";
import "./App.css";
import Cookies from "js-cookie";
import { Routes, BrowserRouter as Router, Route, Navigate } from "react-router-dom";
import { publicRoutes, PublicRoute, PrivateRoute, privateRoutes } from "~/routes/index.router";

import DefaultLayout from "./components/layout/defaultlayout/DefaultLayout";

// import DefaultLayOut from "./components/layout/DefaultLayout";

function App() {

    const isAuthenticated = () => {
        const token = JSON.parse(localStorage.getItem('token'));
        const userId = Cookies.get('UserId');
        console.log('token : ', token, userId)
        if (!token && !userId) return false;
        return true; // For testing purposes, always returns true
    };

    return (
        <Router>
            <div className="App">
                <Routes>
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
                    {/* {privateRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if ((route.layout === null)) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
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
                    })} */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
