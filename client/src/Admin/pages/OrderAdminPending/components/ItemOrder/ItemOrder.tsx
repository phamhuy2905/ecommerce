import Tippy from "@tippyjs/react";
import { OrderShipping, UserOrder } from "../../../../types/order.type";
import { formatCoin } from "../../../../../utils/format";

function ItemOrder({
    userOrder,
    total,
    orderShipping,
    idOrder,
}: {
    userOrder: UserOrder;
    total: number;
    orderShipping: OrderShipping;
    idOrder: string;
}) {
    const { address, address2, fullName, phoneNumber, province, district, ward } = orderShipping;
    return (
        <tr className="mt-2 bg-gray-800">
            <th className="flex items-center whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs">
                <img
                    src={userOrder.avatar ? userOrder.avatar : "https://avatars.githubusercontent.com/u/107147020?v=4"}
                    className="h-12 w-12 rounded-full border bg-white"
                    alt="Avatar"
                />
                <Tippy content={"fullName"}>
                    <span className="ml-3 font-bold text-white ">{fullName}</span>
                </Tippy>
            </th>
            <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                (+84){" " + phoneNumber}
            </td>
            <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                <Tippy
                    content={`Địa chỉ: ${address2 ? address2 + ", " : ""} ${address}${", " + ward}${", " + district}${
                        ", " + province
                    }`}
                    interactive
                >
                    <p
                        style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            width: "200px",
                        }}
                    >
                        {orderShipping.address}
                    </p>
                </Tippy>
            </td>
            <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                <button className={`unded-[5px] bg-blue-400 px-5 py-3`}>Pending</button>
            </td>
            <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                {formatCoin(total)}
            </td>
            <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                <div className="flex">
                    <a
                        href={`/admin/order-detail/${idOrder}`}
                        className="cursor-pointer rounded-[10px] bg-slate-700 px-3 py-[2px]"
                    >
                        👁️‍🗨️
                    </a>
                </div>
            </td>
        </tr>
    );
}

export default ItemOrder;
