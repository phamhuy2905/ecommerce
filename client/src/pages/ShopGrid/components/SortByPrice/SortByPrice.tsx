import { motion } from "framer-motion";
import Tippy from "@tippyjs/react";
import { FiChevronDown } from "react-icons/fi";
import { useState } from "react";
import { searchParams } from "../../../../utils/query";
import { omit } from "lodash";
import { FilterProductType } from "../../../../types/product.type";
import { createSearchParams, useNavigate } from "react-router-dom";
import { path } from "../../../../helpers/path.helper";
function SortByPrice() {
    const [isSelect, setIsSelect] = useState(false);
    const query: FilterProductType = searchParams();
    const navigate = useNavigate();
    const sortbyPrice = (sort: string) => {
        const queryFilter: FilterProductType = omit(query, ["sort"]);
        navigate(
            `${path.client["shop-grid"]}/?${createSearchParams({
                ...queryFilter,
                sort,
            } as any).toString()}`
        );
    };
    return (
        <div className="cursor-pointer">
            <Tippy
                placement="bottom"
                animation="perspective"
                interactive
                trigger="click"
                onShow={(instance) => (isSelect ? instance.show() : instance.hide())}
                onHide={() => setIsSelect(false)}
                hideOnClick={true}
                content={
                    <div
                        className="py-2  z-10 bg-white rounded-[10px] min-w-[170px]"
                        style={{ boxShadow: " rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
                    >
                        <ul>
                            <li
                                onClick={() => sortbyPrice("productPrice")}
                                className="text-[14px] text-gray-500 py-2 px-3 cursor-pointer"
                            >
                                Thấp đến cao
                            </li>
                            <li
                                onClick={() => sortbyPrice("-productPrice")}
                                className="text-[14px] text-gray-500 py-2 px-3 cursor-pointer"
                            >
                                Cao đến thấp
                            </li>
                            <li className="text-[14px] text-gray-500 py-2 px-3 cursor-pointer">Trending</li>
                        </ul>
                    </div>
                }
            >
                <div
                    className="flex items-center px-3 py-1 border-[1px] border-[#ddd] select-none"
                    onClick={() => setIsSelect(!isSelect)}
                >
                    <p className="text-[15px]  text-gray-600 mr-3">Sắp xếp theo giá</p>
                    <motion.div animate={{ rotate: isSelect ? -180 : 0 }}>
                        <FiChevronDown className="text-[18px] text-gray-600 " />
                    </motion.div>
                </div>
            </Tippy>
        </div>
    );
}

export default SortByPrice;
