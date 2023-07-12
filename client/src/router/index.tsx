import { lazy } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";

const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Profile = lazy(() => import("../pages/Profile"));
const ShopGrid = lazy(() => import("../pages/ShopGrid"));
const ProductDetail = lazy(() => import("../pages/ProductDetail"));
const Cart = lazy(() => import("../pages/Cart"));
const CheckOut = lazy(() => import("../pages/CheckOut"));

import DefaultLayout from "../layouts/DefaultLayout";
import { useAuthContext } from "../context/auth.context";
import Test from "../pages/Test";
import ErrorPage from "../pages/ErrorPage";
import HomeAdmin from "../Admin/pages/HomeAdmin";
import ProductAdmin from "../Admin/pages/ProductAdmin";
import DefaultLayoutAdmin from "../Admin/layouts/DefaultLayoutAdmin";
import AddProduct from "../Admin/pages/AddProduct";

function ProtectedRoute() {
    const { isAuthenticated } = useAuthContext();
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

function RejectedRoute() {
    const { isAuthenticated } = useAuthContext();
    return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}
function AdminRoute() {
    const { isAuthenticated, profile } = useAuthContext();
    return isAuthenticated && profile?.role === "0001" ? <Outlet /> : <Navigate to="/error" />;
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
            path: "/test",
            index: true,
            element: (
                <DefaultLayout>
                    <Test />
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
                {
                    path: "/checkout/:state",
                    element: (
                        <DefaultLayout>
                            <CheckOut />
                        </DefaultLayout>
                    ),
                },
            ],
        },
        {
            path: "/",
            element: <AdminRoute />,
            children: [
                {
                    path: "/admin",
                    element: (
                        <DefaultLayoutAdmin>
                            <HomeAdmin />
                        </DefaultLayoutAdmin>
                    ),
                },
                {
                    path: "/admin/product",
                    element: (
                        <DefaultLayoutAdmin>
                            <ProductAdmin />
                        </DefaultLayoutAdmin>
                    ),
                },
                {
                    path: "/admin/add-product",
                    element: (
                        <DefaultLayoutAdmin>
                            <AddProduct />
                        </DefaultLayoutAdmin>
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

        {
            path: "*",
            index: true,
            element: <ErrorPage />,
        },
    ]);
    return routeElements;
}

export default useRoutesElement;
