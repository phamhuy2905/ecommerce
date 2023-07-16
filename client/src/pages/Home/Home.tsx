import Banner from "../../components/Banner";
import Navbar from "../../components/Navbar";
import Product from "./components/Products";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";
function Home() {
    const { state }: { state: string } = useLocation();
    useEffect(() => {
        if (state) {
            toast.success(state, { duration: 3000 });
            window.history.replaceState({}, document.title);
        }
    }, [state]);
    return (
        <>
            <Navbar />
            <Banner />
            <Product />
        </>
    );
}

export default Home;
