import io from "socket.io-client";
const host = "http://localhost:4000";
function Test() {
    const socket = io(host, {});
    socket.connect();
    socket.on("message", function (data) {
        console.log(data);
    });
    const handleEmit = () => {
        socket.emit("message", "Emit is ok");
    };

    return (
        <div>
            <button onClick={handleEmit} className="bg-blue-300 px-2 py-1">
                Submit
            </button>
        </div>
    );
}

export default Test;
