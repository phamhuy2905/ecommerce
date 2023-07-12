import { Toaster } from "react-hot-toast";
import "./App.css";
import useRoutesElement from "./router";
function App() {
    const routeElements = useRoutesElement();
    return (
        <>
            <div>{routeElements}</div>
            <Toaster />
        </>
    );
}

export default App;
