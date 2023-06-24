import { motion } from "framer-motion";
import Tippy from "@tippyjs/react";
import { FiChevronDown } from "react-icons/fi";
import { useState } from "react";

import classNames from "classnames/bind";
import styles from "./SelectCategory.module.scss";
const cx = classNames.bind(styles);

function SelectCategory() {
    const [isSelect, setIsSelect] = useState(false);
    return (
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
                        <li className="text-[14px] text-gray-500 py-2 px-3 cursor-pointer">Electronics</li>
                        <li className="text-[14px] text-gray-500 py-2 px-3 cursor-pointer">Fasion</li>
                        <li className="text-[14px] text-gray-500 py-2 px-3 cursor-pointer">Beauty</li>
                        <li className="text-[14px] text-gray-500 py-2 px-3 cursor-pointer">Jewelry</li>
                    </ul>
                </div>
            }
        >
            <div onClick={() => setIsSelect(!isSelect)} className={cx("select-none", { select: true })}>
                <p className="text-[15px]  text-gray-600 mr-3">Select Category</p>
                <motion.div animate={{ rotate: isSelect ? -180 : 0 }}>
                    <FiChevronDown className="text-[18px] text-gray-600 " />
                </motion.div>
            </div>
        </Tippy>
    );
}

export default SelectCategory;
