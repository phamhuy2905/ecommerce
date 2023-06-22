import classNames from "classnames/bind";
import styles from "./ItemCategory.module.scss";
import { useCallback } from "react";
import { FilterProductType } from "../../../../types/product.type";
import { omit } from "lodash";
import { searchParams } from "../../../../utils/query";
import { createSearchParams, useNavigate } from "react-router-dom";
import { path } from "../../../../helpers/path.helper";
const cx = classNames.bind(styles);
function ItemCategory({ name, quantity }: { name: string; quantity: number }) {
    const navigate = useNavigate();
    const query: FilterProductType = searchParams();
    const filterCategory = useCallback(() => {
        const queryFilter: FilterProductType = omit(query, ["q"]);
        navigate(
            `${path.client["shop-grid"]}/?${createSearchParams({
                ...queryFilter,
                q: name,
            } as any).toString()}`
        );
    }, [name]);
    return (
        <li className="flex items-center justify-between px-4 cursor-pointer py-[2px] my-2 ">
            <span
                onClick={filterCategory}
                className={cx("text-[15px] text-blue-400 hover:translate-x-3 transition-transform", { item: true })}
            >
                {name}
            </span>
            <span className="w-[25px] h-[25px] border-[1px] border-gray-200 rounded-[7px] text-[12px] flex items-center justify-center hover:bg-blue-400">
                {quantity}
            </span>
        </li>
    );
}

export default ItemCategory;
