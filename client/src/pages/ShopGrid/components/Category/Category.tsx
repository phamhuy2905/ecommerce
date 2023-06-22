import { getCategory } from "../../../../apis/static.api";
import ItemCategory from "../ItemCategory";
import { useQuery } from "react-query";
function Category() {
    const { data } = useQuery({
        queryKey: ["category"],
        queryFn: () => getCategory(),
    });

    return (
        <div className="flex flex-col mt-3">
            <p className="text-[18px] text-black font-semibold py-2 px-2 border-b-[1px] border-gray-300">
                Tất cả danh mục
            </p>
            <ul className="py-2 max-h-[280px] overflow-y-scroll">
                {data?.data.data.map((val, index) => {
                    return <ItemCategory key={index} name={val.info.name} quantity={val.info.quantityProduct} />;
                })}
            </ul>
        </div>
    );
}

export default Category;
