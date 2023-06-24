import { BsList } from "react-icons/bs";
import { TfiViewGrid } from "react-icons/tfi";
import ProductGrid from "../ProductGrid";
import SortByPrice from "../../components/SortByPrice";
import { useEffect, useRef, useState } from "react";
import { getProduct } from "../../../../apis/product.api";
import { useQuery } from "react-query";
import { FilterProductType } from "../../../../types/product.type";
import { isUndefined, omitBy } from "lodash";
import { searchParams } from "../../../../utils/query";
import Pagination from "../../../../components/Pagination";
import { observer } from "../../../../utils/observer";
function FeaturedShop() {
    const [isGrid, setIsGrid] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);
    const query: FilterProductType = searchParams();
    const queryParams: FilterProductType = omitBy(
        {
            page: query.page || 1,
            "productPrice[gte]": query["productPrice[gte]"],
            "productPrice[gt]": query["productPrice[gt]"],
            "productPrice[lte]": query["productPrice[lte]"],
            "productPrice[lt]": query["productPrice[lt]"],
            q: query.q,
            sort: query.sort,
        },
        isUndefined
    );
    const { data } = useQuery({
        queryKey: ["products", queryParams],
        queryFn: () => getProduct(queryParams),
        staleTime: 1000 * 60 * 3,
        keepPreviousData: true,
    });

    const handleScroll = () => {
        scrollRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "start",
        });
    };

    useEffect(() => {
        const images = document.querySelectorAll("#image");
        images.forEach((image) => {
            observer.observe(image);
        });
    }, [data, isGrid]);
    return (
        <div className="px-6" ref={scrollRef}>
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <button
                        onClick={() => setIsGrid(true)}
                        className={` mr-2 flex items-center justify-center w-[40px] h-[40px] px-1 py-1 ${
                            isGrid ? "border-[2px] border-blue-400" : "border-[1px] border-gray-400 "
                        }`}
                    >
                        <TfiViewGrid className="text-[25px] " />
                    </button>
                    <button
                        onClick={() => setIsGrid(false)}
                        className={`mr-5 flex items-center justify-center w-[40px] h-[40px] px-1 py-1 ${
                            !isGrid ? "border-[2px] border-blue-400" : "border-[1px] border-gray-400 "
                        }`}
                    >
                        <BsList className="text-[25px] " />
                    </button>
                    <p className="text-[14px] text-gray-500">
                        Showing {data?.data.data.page.itemsPerPage} of {data?.data.data.page.totalItems} results
                    </p>
                </div>
                <SortByPrice />
            </div>
            <ProductGrid isGrid={isGrid} products={data?.data?.data?.products || []} />
            <div className="flex justify-center mt-10">
                <Pagination
                    onClick={handleScroll}
                    maxPage={data?.data.data.page.totalPage || 1}
                    page={query.page || 1}
                    query={queryParams}
                />
            </div>
        </div>
    );
}
export default FeaturedShop;
