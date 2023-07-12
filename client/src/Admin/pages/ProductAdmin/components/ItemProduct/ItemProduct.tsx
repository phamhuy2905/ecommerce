import { BsTrash } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { UseDarkModeContext } from "../../../../context/darkMode.context";
import { ProductType } from "../../../../../types/product.type";
import { formatCoin } from "../../../../../utils/format";
function ItemProduct({ product }: { product: ProductType }) {
    const { darkMode } = UseDarkModeContext();
    return (
        <tr className={`${darkMode ? "dark" : "bg-gray-800"} mt-2`}>
            <th className="flex items-center whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs">
                <img src={product.productThumbnail} className="h-12 w-12 rounded-full border bg-white" alt="..." />
                <span className="ml-3 font-bold text-white">{product.productName}</span>
            </th>
            <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                {formatCoin(product.productPrice)}
            </td>
            <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                <span className="block w-[50px] overflow-hidden rounded-[10px] bg-green-500 px-3 py-[2px] text-center">
                    {product.productQuantity}
                </span>
            </td>

            <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                <button className="rounded-[5px] bg-orange-400 px-5 py-3">
                    <AiOutlineEdit />
                </button>
            </td>
            <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                <button className="rounded-[5px] bg-red-500 px-5 py-3">
                    <BsTrash />
                </button>
            </td>
            <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                <div className="flex">
                    <p className="cursor-pointer rounded-[10px] bg-slate-700 px-3 py-[2px]">👁️‍🗨️</p>
                </div>
            </td>
        </tr>
    );
}

export default ItemProduct;
