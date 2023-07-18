import classNames from "classnames/bind";
import styles from "../ItemCategory/ItemCategory.module.scss";
import { getCategory } from "../../../../apis/static.api";
import ItemCategory from "../ItemCategory";
import { useQuery } from "react-query";
const cx = classNames.bind(styles);
function Category() {
    const { data } = useQuery({
        queryKey: ["category"],
        queryFn: () => getCategory(),
    });

    return (
        <div className="mt-3 flex flex-col">
            <p className="border-b-[1px] border-gray-300 px-2 py-2 text-[18px] font-semibold text-black">
                Tất cả danh mục
            </p>
            <ul className="max-h-[280px] overflow-y-scroll py-2">
                <li className="my-2 flex cursor-pointer items-center justify-between px-4 py-[2px] ">
                    <a
                        href="/shop-grid"
                        className={cx("text-[15px] text-blue-400 transition-transform hover:translate-x-3", {
                            item: true,
                        })}
                    >
                        Tất cả
                    </a>
                    <span className="flex h-[25px] w-[25px] items-center justify-center rounded-[7px] border-[1px] border-gray-200 text-[12px] hover:bg-blue-400">
                        ...
                    </span>
                </li>
                {data?.data.data.map((val, index) => {
                    return <ItemCategory key={index} name={val.info.name} quantity={val.info.quantityProduct} />;
                })}
            </ul>
        </div>
    );
}

export default Category;
