import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

function ChangeQuantity({ quantity, onQuantity }: { quantity: number; onQuantity: (type: "incr" | "decr") => void }) {
    return (
        <div className="flex items-center ">
            <div className="flex items-center bg-slate-100">
                <button className="px-2 py-2 text-[20px] text-gray-600" onClick={() => onQuantity("decr")}>
                    <AiOutlineMinus />
                </button>
                <span className="mx-2 text-[14px] text-gray-600">{quantity}</span>
                <button className="px-2 py-2 text-[20px] text-gray-600" onClick={() => onQuantity("incr")}>
                    <AiOutlinePlus />
                </button>
            </div>
        </div>
    );
}

export default ChangeQuantity;
