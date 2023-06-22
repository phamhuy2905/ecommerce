import { HiOutlineXMark } from "react-icons/hi2";
import styles from "./MiniCart.module.scss";
import classNames from "classnames/bind";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { removeItemCart } from "../../redux/cart.slice";
const cx = classNames.bind(styles);
function MiniCart({ isHideCart, setIsHideCart }: { isHideCart: boolean; setIsHideCart: () => void }) {
    const overLayRef = useRef<HTMLDivElement>(null);
    const { carts, total } = useSelector((state: RootState) => state.cart);
    const dispatch = useAppDispatch();
    const handleHideCart = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target === overLayRef.current) setIsHideCart();
    };

    const handleRemoveItemCart = (id: string) => {
        dispatch(removeItemCart({ id }));
    };
    return (
        <div
            ref={overLayRef}
            onClick={handleHideCart}
            className={`fixed left-0 top-0 w-full h-full  ${!isHideCart ? "z-10 h-full" : "h-0 "}`}
            style={{
                backgroundColor: !isHideCart ? "rgba(0, 0, 0, 0.8)" : "transparent",
            }}
        >
            <div
                className={cx(`absolute right-0 top-0 h-[100vh] bg-white z-50 w-[25%] px-3 py-3 translate-x-[100%]`, {
                    // wrapper_inactive: isHideCart,
                    wrapper_active: !isHideCart,
                })}
            >
                <div className="flex items-center justify-between py-3 border-[#ddd] border-b-[1px]">
                    <p className="text-[16px] font-semibold">Giỏ hàng</p>
                    <HiOutlineXMark onClick={setIsHideCart} className="text-[20px] cursor-pointer" />
                </div>
                <div className="flex flex-col my-4">
                    <span className="text-[14px] text-gray-400 mb-1">You are eligible for free shipping</span>
                    <div
                        className={cx("bg-[#0989ff] h-[10px]", {
                            progress_striped: true,
                            progress_bar: true,
                            progress_ani: true,
                        })}
                    ></div>
                </div>
                <div className="flex flex-col h-[450px] overflow-y-auto mb-3">
                    {carts.length ? (
                        <>
                            {carts.map((val, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="flex pb-3 relative w-full border-b-[1px] border-[#ddd] mb-2"
                                    >
                                        <div className="w-[70px] h-[75px] overflow-hidden border-[1px] border-[#ddd]">
                                            <img
                                                className="w-full h-full object-cover"
                                                src={val.thumbnail}
                                                alt="Product"
                                            />
                                        </div>
                                        <div className="ml-2 ">
                                            <p className="text-[16px] font-semibold mb-1">{val.name}</p>
                                            <p className="text-blue-500 text-[14px] font-semibold">
                                                ${val.price}{" "}
                                                <span className="text-[13px] text-gray-600"> x{val.quantity}</span>
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => handleRemoveItemCart(val.id)}
                                            className="text-[15px] absolute right-2 top-[50%] translate-y-[-50%] p-2"
                                        >
                                            <HiOutlineXMark />
                                        </button>
                                    </div>
                                );
                            })}
                        </>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center">
                            <img
                                src="https://shofy-client.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fempty-cart.373610ed.png&w=384&q=75"
                                alt=""
                            />
                            <p className="mt-2 text-[17px] font-semibold">Không có sản phẩm nào</p>
                        </div>
                    )}
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-[15px] font-semibold">Subtotal:</p>
                    <p className="text-[16px] text-gray-600 font-semibold">${total}</p>
                </div>
                <button className="py-[10px] border-[1px] border-[#ddd] bg-black hover:bg-white transition-all flex justify-center items-center text-[15px] text-white mb-5 w-full mt-3 hover:text-black">
                    View cart
                </button>
                <button className="py-[10px] border-[1px] border-[#ddd] bg-white hover:bg-black transition-all flex justify-center items-center text-[15px] text-black mb-5 w-full mt-3 hover:text-white">
                    Checkout
                </button>
            </div>
        </div>
    );
}

export default MiniCart;
