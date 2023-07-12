import { useEffect } from "react";
import error from "../../assets/error.webp";
function ErrorPage() {
    useEffect(() => {
        document.title = "Error";
    }, []);
    return (
        <div
            style={{
                backgroundImage: `url(${error})`,
                backgroundSize: "cover",
            }}
            className="h-screen w-full"
        ></div>
    );
}

export default ErrorPage;
