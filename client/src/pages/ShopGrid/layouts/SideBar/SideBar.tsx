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
            <div className="mt-2 grid grid-cols-2 gap-x-3">
                <div className="flex flex-col ">
                    <span className="text-secondary mb-1 select-none text-sm font-medium">From</span>
                    <div className="flex gap-x-2 rounded-sm border border-gray-400 p-3">
                        <span className="text-secondary text-sm font-semibold">VND</span>
                        <input
                            className="text-secondary w-full text-xs font-light outline-none"
                            value={minPrice}
                            onChange={(e) => setMinPrice(+e.target.value >= 0 ? +e.target.value : minPrice)}
                        />
                    </div>
                </div>
                <div className="flex flex-col ">
                    <span className="text-secondary mb-1 select-none text-sm font-medium">To</span>
                    <div className="flex gap-x-2 rounded-sm border border-gray-400 p-3">
                        <span className="text-secondary text-sm font-semibold">VND</span>
                        <input
                            className="text-secondary w-full text-xs font-light outline-none"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(+e.target.value >= 0 ? +e.target.value : maxPrice)}
                        />
                    </div>
                </div>
            </div>
            <button onClick={filterPrice} className="mt-3 rounded-[5px] bg-blue-500 px-5 py-2 text-[14px] text-white">
                Filter
            </button>
            <Category />
            <div className="mt-3 flex flex-col">
                <p className="border-b-[1px] border-gray-300 px-2 py-2 text-[18px] font-semibold text-black">
                    Thương hiệu
                </p>
                <ul className="max-h-[200px] overflow-y-auto py-2">
                    <InputChecked name="Apple" />
                    <InputChecked name="Samsunf" />
                    <InputChecked name="Louis vuitton" />
                    <InputChecked name="Adiddas" />
                </ul>
            </div>

            <div className="mt-3 flex flex-col">
                <p className="border-b-[1px] border-gray-300 px-2 py-2 text-[18px] font-semibold text-black">Nơi bán</p>
                <ul className="scroll max-h-[280px] overflow-y-scroll py-2">
                    <InputChecked name="Hồ Chí Minh" />
                    <InputChecked name="Buôn Ma Thuột" />
                    <InputChecked name="Vinh" />
                    <InputChecked name="Hà Nội" />
                </ul>
            </div>

            <div className="mt-3 flex flex-col">
                <p className="border-b-[1px] border-gray-300 px-2 py-2 text-[18px] font-semibold text-black">
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
