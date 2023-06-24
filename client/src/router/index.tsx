import { lazy } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";

const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Profile = lazy(() => import("../pages/Profile"));
const ShopGrid = lazy(() => import("../pages/ShopGrid"));
const ProductDetail = lazy(() => import("../pages/ProductDetail"));
const Cart = lazy(() => import("../pages/Cart"));

import DefaultLayout from "../layouts/DefaultLayout";
import { useAuthContext } from "../context/auth.context";

function ProtectedRoute() {
    const { isAuthenticated } = useAuthContext();
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

function RejectedRoute() {
    const { isAuthenticated } = useAuthContext();
    return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}

function useRoutesElement() {
    const routeElements = useRoutes([
        {
            path: "/",
            index: true,
            element: (
                <DefaultLayout>
                    <Home />
                </DefaultLayout>
            ),
        },
        {
            path: "/shop-grid",
            index: true,
            element: (
                <DefaultLayout>
                    <ShopGrid />
                </DefaultLayout>
            ),
        },
        {
            path: "/detail/:id",
            index: true,
            element: (
                <DefaultLayout>
                    <ProductDetail />
                </DefaultLayout>
            ),
        },
        {
            path: "/cart",
            index: true,
            element: (
                <DefaultLayout>
                    <Cart />
                </DefaultLayout>
            ),
        },
        {
            path: "/",
            element: <ProtectedRoute />,
            children: [
                {
                    path: "/profile",
                    element: (
                        <DefaultLayout>
                            <Profile />
                        </DefaultLayout>
                    ),
                },
            ],
        },
        {
            path: "/",
            element: <RejectedRoute />,
            children: [
                {
                    path: "/login",
                    element: (
                        <DefaultLayout>
                            <Login />
                        </DefaultLayout>
                    ),
                },
                {
                    path: "/register",
                    element: (
                        <DefaultLayout>
                            <Register />
                        </DefaultLayout>
                    ),
                },
            ],
        },
    ]);
    return routeElements;
}

export default useRoutesElement;
