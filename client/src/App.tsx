import "./App.css";
import useRoutesElement from "./router";

function App() {
    const routeElements = useRoutesElement();
    return (
        <>
            <div>{routeElements}</div>
        </>
    );
}

export default App;
