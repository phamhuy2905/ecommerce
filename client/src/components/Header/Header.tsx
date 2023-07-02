import { AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { useState } from "react";
import "tippy.js/animations/perspective.css";
import MiniCart from "../../layouts/MiniCart";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import SelectCategory from "../SelectCategory";
import ActionProfile from "../ActionProfile";

const cx = classNames.bind(styles);
function Header() {
    const [isHideCart, setIsHideCart] = useState<boolean>(true);
    const { carts } = useSelector((state: RootState) => state.cart);
    const lenghtCart = carts.flatMap((val) => val.itemProducts).length;
    return (
        <div className="border-b-[1px] borer-[#ddd] lg:py-8 py-5 ">
            <div className="xl:max-w-7xl  mx-auto px-4  ">
                <div className="flex items-center justify-between">
                    <a href="/" className="w-[135px] h-[35px] overflow-hidden">
                        <img
                            className="w-full h-full object-cover"
                            src="https://shofy-client.vercel.app/_next/static/media/logo.414c93a2.svg"
                            alt="Logo"
                        />
                    </a>
                    <div
                        className={cx("relative px-2 md:!flex sm:!hidden search", {
                            search: true,
                        })}
                    >
                        <input
                            className="w-full pl-2 pr-[180px] py-3 md:py-2 text-[14px] text-gray-500 border-[2px] border-blue-700  outline-none"
                            type="text"
                            name=""
                            id=""
                            placeholder="Search for products..."
                        />
                        <div>
                            <SelectCategory />
                        </div>
                        <button className="bg-blue-500 px-4 py-3 md:py-2">
                            <BsSearch className="text-white text-[28px] md:text-[20px]" />
                        </button>
                    </div>
                    <div className="flex items-center">
                        <p className="relative cursor-pointer">
                            <span className="absolute top-[-3px] right-[-3px] w-[15px] h-[15px] bg-blue-500 text-white rounded-full flex items-center justify-center">
                                1
                            </span>
                            <AiOutlineHeart className="text-blue-900 text-[30px]" />
                        </p>
                        <p onClick={() => setIsHideCart(!isHideCart)} className="relative mx-10 cursor-pointer">
                            <span className="absolute top-[-3px] right-[-3px] w-[15px] h-[15px] bg-blue-500 text-white rounded-full flex items-center justify-center">
                                {lenghtCart}
                            </span>
                            <AiOutlineShoppingCart className="text-blue-900 text-[30px]" />
                        </p>
                        <ActionProfile />
                    </div>
                </div>
            </div>
            <MiniCart isHideCart={isHideCart} setIsHideCart={() => setIsHideCart(!isHideCart)} />
        </div>
    );
}

export default Header;
