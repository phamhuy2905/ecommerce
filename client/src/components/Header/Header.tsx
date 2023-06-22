import { motion } from "framer-motion";
import Tippy from "@tippyjs/react";
import { AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
import { BsSearch } from "react-icons/bs";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { useState } from "react";
import "tippy.js/animations/perspective.css";
import MiniCart from "../../layouts/MiniCart";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);
function Header() {
    const [isSelect, setIsSelect] = useState(false);
    const [isHideCart, setIsHideCart] = useState<boolean>(true);
    const { carts } = useSelector((state: RootState) => state.cart);
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
                            <Tippy
                                animation="perspective"
                                interactive
                                trigger="click"
                                onShow={(instance) => (isSelect ? instance.show() : instance.hide())}
                                onHide={() => setIsSelect(false)}
                                content={
                                    <div className="py-2 shadow-xl z-10 bg-white rounded-[10px] min-w-[170px]">
                                        <ul>
                                            <li className="text-[15px] text-black font-semibold py-2 px-3 cursor-pointer">
                                                Select Cateogory
                                            </li>
                                            <li className="text-[14px] text-gray-500 py-2 px-3 cursor-pointer">
                                                Electronics
                                            </li>
                                            <li className="text-[14px] text-gray-500 py-2 px-3 cursor-pointer">
                                                Fasion
                                            </li>
                                            <li className="text-[14px] text-gray-500 py-2 px-3 cursor-pointer">
                                                Beauty
                                            </li>
                                            <li className="text-[14px] text-gray-500 py-2 px-3 cursor-pointer">
                                                Jewelry
                                            </li>
                                        </ul>
                                    </div>
                                }
                            >
                                <div
                                    onClick={() => setIsSelect(!isSelect)}
                                    className={cx("select-none", { select: true })}
                                >
                                    <p className="text-[15px]  text-gray-600 mr-3">Select Category</p>
                                    <motion.div animate={{ rotate: isSelect ? -180 : 0 }}>
                                        <FiChevronDown className="text-[18px] text-gray-600 " />
                                    </motion.div>
                                </div>
                            </Tippy>
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
                                {carts.length}
                            </span>
                            <AiOutlineShoppingCart className="text-blue-900 text-[30px]" />
                        </p>
                        <div className="w-[35px] h-[35px] overflow-hidden rounded-full border-[1px] border-gray-400 cursor-pointer">
                            <img
                                className="w-full h-full object-cover"
                                src="https://avatars.githubusercontent.com/u/107147020?v=4"
                                alt="Avatar"
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* {!isHideCart ? (
                <MiniCart isHideCart={isHideCart} setIsHideCart={() => setIsHideCart(!isHideCart)} />
            ) : (
                <></>
            )} */}
            <MiniCart isHideCart={isHideCart} setIsHideCart={() => setIsHideCart(!isHideCart)} />
        </div>
    );
}

export default Header;
