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
    }, [name, query]);
    return (
        <li className="my-2 flex cursor-pointer items-center justify-between px-4 py-[2px] ">
            <span
                onClick={filterCategory}
                className={cx("text-[15px] text-blue-400 transition-transform hover:translate-x-3", { item: true })}
            >
                {name}
            </span>
            <span className="flex h-[25px] w-[25px] items-center justify-center rounded-[7px] border-[1px] border-gray-200 text-[12px] hover:bg-blue-400">
                {quantity}
            </span>
        </li>
    );
}

export default ItemCategory;
