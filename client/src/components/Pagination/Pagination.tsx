import { Link, createSearchParams } from "react-router-dom";
import { test } from "../../utils/paginate";
import { FilterProductType } from "../../types/product.type";

function Pagination({
    page,
    maxPage,
    query,
    onClick,
}: {
    page: number;
    maxPage: number;
    query: FilterProductType;
    onClick: () => void;
}) {
    const pages = test(maxPage);

    return (
        <div className="flex items-center">
            {pages[page - 1].map((val, index) => {
                if (typeof val === "number") {
                    return (
                        <Link
                            onClick={onClick}
                            key={index}
                            className={`text-[14px]   py-1 px-3 flex items-center justify-center rounded-[5px]  mr-2 ]  ${
                                +page === val
                                    ? "border-blue-500 border-[2px] text-blue-500"
                                    : "border-gray-500 border-[1px] text-gray-500"
                            }`}
                            to={{
                                pathname: "/shop-grid",
                                search: createSearchParams({
                                    ...(query as any),
                                    page: val,
                                }).toString(),
                            }}
                        >
                            {val}
                        </Link>
                    );
                } else {
                    return (
                        <button
                            key={index}
                            className="text-[14px] py-1 px-3 flex items-center justify-center bg-blue-400 rounded-[5px] mr-2"
                        >
                            {val}
                        </button>
                    );
                }
            })}
        </div>
    );
}

export default Pagination;
