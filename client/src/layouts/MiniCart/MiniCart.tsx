import { HiOutlineXMark } from "react-icons/hi2";
import styles from "./MiniCart.module.scss";
import classNames from "classnames/bind";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { removeItemCart } from "../../redux/cart.slice";
import { path } from "../../helpers/path.helper";
const cx = classNames.bind(styles);
function MiniCart({ isHideCart, setIsHideCart }: { isHideCart: boolean; setIsHideCart: () => void }) {
    const overLayRef = useRef<HTMLDivElement>(null);
    const { carts, total } = useSelector((state: RootState) => state.cart);
    const dispatch = useAppDispatch();
    const handleHideCart = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target === overLayRef.current) setIsHideCart();
    };

    const handleRemoveItemCart = ({
        color,
        productId,
        shopId,
        size,
    }: {
        color: string;
        productId: string;
        shopId: string;
        size: string;
    }) => {
        dispatch(removeItemCart({ color, productId, shopId, size }));
    };
    return (
        <div
            ref={overLayRef}
            onClick={handleHideCart}
            className={`fixed left-0 top-0 w-full   ${!isHideCart ? "z-10 !h-full" : "!h-0 "}`}
            style={{
                backgroundColor: !isHideCart ? "rgba(0, 0, 0, 0.8)" : "transparent",
            }}
        >
            <div
                className={cx(`absolute right-0 top-0 z-50 h-[100vh] w-[25%] translate-x-[100%] bg-white px-3 py-3`, {
                    // wrapper_inactive: isHideCart,
                    wrapper_active: !isHideCart,
                })}
            >
                <div className="flex items-center justify-between border-b-[1px] border-[#ddd] py-3">
                    <p className="text-[16px] font-semibold">Giỏ hàng</p>
                    <HiOutlineXMark onClick={setIsHideCart} className="cursor-pointer text-[20px]" />
                </div>
                <div className="my-4 flex flex-col">
                    <span className="mb-1 text-[14px] text-gray-400">You are eligible for free shipping</span>
                    <div
                        className={cx("h-[10px] bg-[#0989ff]", {
                            progress_striped: true,
                            progress_bar: true,
                            progress_ani: true,
                        })}
                    ></div>
                </div>
                <div className="mb-3 flex h-[450px] flex-col overflow-y-auto">
                    {carts.length ? (
                        <>
                            {carts.map((val, index) => {
                                return (
                                    <div key={index}>
                                        {val.itemProducts.map((value, _index) => {
                                            return (
                                                <div
                                                    key={_index}
                                                    className="relative mb-2 flex w-full border-b-[1px] border-[#ddd] pb-3"
                                                >
                                                    <div className="h-[75px] w-[70px] overflow-hidden border-[1px] border-[#ddd]">
                                                        <img
                                                            className="h-full w-full object-cover"
                                                            src={value.thumbnail}
                                                            alt="Product"
                                                        />
                                                    </div>
                                                    <div className="ml-2 ">
                                                        <p className="mb-1 text-[16px] font-semibold">{value.name}</p>
                                                        <p className="text-[14px] font-semibold text-blue-500">
                                                            ${value.price}{" "}
                                                            <span className="text-[13px] text-gray-600">
                                                                {" "}
                                                                x{value.quantity}
                                                            </span>
                                                        </p>
                                                    </div>
                                                    <button
                                                        onClick={() =>
                                                            handleRemoveItemCart({
                                                                color: value.color,
                                                                size: value.size,
                                                                productId: value.id,
                                                                shopId: val.shopId,
                                                            })
                                                        }
                                                        className="absolute right-2 top-[50%] translate-y-[-50%] p-2 text-[15px]"
                                                    >
                                                        <HiOutlineXMark />
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                        </>
                    ) : (
                        <div className="flex h-full flex-col items-center justify-center">
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
                    <p className="text-[16px] font-semibold text-gray-600">${total}</p>
                </div>
                <a
                    href={path.client.cart}
                    className="mb-5 mt-3 flex w-full items-center justify-center border-[1px] border-[#ddd] bg-black py-[10px] text-[15px] text-white transition-all hover:bg-white hover:text-black"
                >
                    View cart
                </a>
                <button className="mb-5 mt-3 flex w-full items-center justify-center border-[1px] border-[#ddd] bg-white py-[10px] text-[15px] text-black transition-all hover:bg-black hover:text-white">
                    Checkout
                </button>
            </div>
        </div>
    );
}

export default MiniCart;
