import Tippy from "@tippyjs/react/headless";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
import { CartProductType } from "../../../../types/cart.type";
import { formatCoin } from "../../../../utils/format";

function ItemCart({ cart, shopName, shopId }: { cart: CartProductType; shopName: string; shopId: string }) {
    console.log(shopId);
    return (
        <>
            <div className="flex items-center my-2">
                <input type="checkbox" />
                <div className="mx-3">
                    <img className="w-[80px] h-[80px] object-cover" src={cart.thumbnail} alt="Product" />
                </div>
                <p className="ml-3 text-[15px] text-gray-500 w-[160px]  truncate">{cart.name}</p>
                <Tippy
                    trigger="click"
                    render={() => {
                        return (
                            <div
                                className="px-3 py-3 min-w-[300px] bg-white rounded-[7px]"
                                style={{
                                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                                }}
                            >
                                <p className="flex items-center mt-2">
                                    <span className="mr-2">Tên shop:</span>
                                    <span>{shopName}</span>
                                </p>
                                <p className="flex items-center mt-2">
                                    <span className="mr-2">Size:</span>
                                    <span>{cart.size}</span>
                                </p>
                                <p className="flex items-center mt-2">
                                    <span className="mr-2">Color:</span>
                                    <span>{cart.color}</span>
                                </p>
                            </div>
                        );
                    }}
                >
                    <div className="flex items-center ml-7 font-semibold cursor-pointer select-none ">
                        <p className="text-[15px] ">Phân loại </p>
                        <FiChevronDown className="ml-1" />
                    </div>
                </Tippy>
            </div>
            <div className="flex items-center justify-between">
                <p className="ml-3 text-[15px] text-gray-500">{formatCoin(cart.price)}</p>
                <div className="flex items-center ">
                    <div className="flex items-center bg-slate-100">
                        <button className="text-[20px] text-gray-600 px-2 py-2">
                            <AiOutlineMinus />
                        </button>
                        <span className="text-[14px] text-gray-600 mx-2">{cart.quantity}</span>
                        <button className="text-[20px] text-gray-600 px-2 py-2">
                            <AiOutlinePlus />
                        </button>
                    </div>
                </div>
                <p className="ml-3 text-[15px] text-gray-500">{formatCoin(cart.price * cart.quantity)}</p>
            </div>
        </>
    );
}

export default ItemCart;
