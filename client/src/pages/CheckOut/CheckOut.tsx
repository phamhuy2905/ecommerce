import { useParams } from "react-router-dom";
function CheckOut() {
    const test = useParams();
    const x = decodeURIComponent(test.state as string);
    const y = JSON.parse(atob(x));
    console.log(y);

    return <div>CheckOut</div>;
}

export default CheckOut;
