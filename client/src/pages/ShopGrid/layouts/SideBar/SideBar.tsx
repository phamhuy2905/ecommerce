import { useCallback, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import InputChecked from "../../components/InputChecked";
import { path } from "../../../../helpers/path.helper";
import { searchParams } from "../../../../utils/query";
import { FilterProductType } from "../../../../types/product.type";
import { omit } from "lodash";
import Category from "../../components/Category";

function SideBar() {
    const navigate = useNavigate();
    const query: FilterProductType = searchParams();
    const [minPrice, setMinPrice] = useState(query["productPrice[gte]"] || 0);
    const [maxPrice, setMaxPrice] = useState(query["productPrice[lte]"] || 1000000);

    const filterPrice = useCallback(() => {
        const queryFilter: FilterProductType = omit(query, [
            "productPrice[gt]",
            "productPrice[lt]",
            "productPrice[gte]",
            "productPrice[lte]",
        ]);
        navigate(
            `${path.client["shop-grid"]}/?${createSearchParams({
                ...queryFilter,
                "productPrice[gte]": minPrice,
                "productPrice[lte]": maxPrice,
            } as any).toString()}`
        );
    }, [maxPrice, minPrice]);
    return (
        <>
            <div className="grid grid-cols-2 gap-x-3 mt-2">
                <div className="flex flex-col ">
                    <span className="text-secondary select-none text-sm font-medium mb-1">From</span>
                    <div className="p-3 flex gap-x-2 border border-gray-400 rounded-sm">
                        <span className="text-secondary font-semibold text-sm">VND</span>
                        <input
                            className="outline-none w-full text-secondary text-xs font-light"
                            value={minPrice}
                            onChange={(e) => setMinPrice(+e.target.value >= 0 ? +e.target.value : minPrice)}
                        />
                    </div>
                </div>
                <div className="flex flex-col ">
                    <span className="text-secondary select-none text-sm font-medium mb-1">To</span>
                    <div className="p-3 flex gap-x-2 border border-gray-400 rounded-sm">
                        <span className="text-secondary font-semibold text-sm">VND</span>
                        <input
                            className="outline-none w-full text-secondary text-xs font-light"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(+e.target.value >= 0 ? +e.target.value : maxPrice)}
                        />
                    </div>
                </div>
            </div>
            <button onClick={filterPrice} className="text-[14px] text-white rounded-[5px] py-2 px-5 bg-blue-500 mt-3">
                Filter
            </button>
            <Category />
            <div className="flex flex-col mt-3">
                <p className="text-[18px] text-black font-semibold py-2 px-2 border-b-[1px] border-gray-300">
                    Thương hiệu
                </p>
                <ul className="py-2 max-h-[200px] overflow-y-auto">
                    <InputChecked name="Apple" />
                    <InputChecked name="Samsunf" />
                    <InputChecked name="Louis vuitton" />
                    <InputChecked name="Adiddas" />
                </ul>
            </div>

            <div className="flex flex-col mt-3">
                <p className="text-[18px] text-black font-semibold py-2 px-2 border-b-[1px] border-gray-300">Nơi bán</p>
                <ul className="py-2 max-h-[280px] overflow-y-scroll scroll">
                    <InputChecked name="Hồ Chí Minh" />
                    <InputChecked name="Buôn Ma Thuột" />
                    <InputChecked name="Vinh" />
                    <InputChecked name="Hà Nội" />
                </ul>
            </div>

            <div className="flex flex-col mt-3">
                <p className="text-[18px] text-black font-semibold py-2 px-2 border-b-[1px] border-gray-300">
                    Khuyến mãi
                </p>
                <ul className="py-2 ">
                    <InputChecked name="Có votcher 💯" />
                    <InputChecked name="Votcher trên 5% " />
                    <InputChecked name="Votcher trên 10% 👌" />
                    <InputChecked name="Votcher trên 20%" />
                </ul>
            </div>
        </>
    );
}

export default SideBar;
