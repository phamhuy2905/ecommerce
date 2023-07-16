import { ItemProductOrder as ItemProductOrderType } from "../../../../types/order.type";
import { formatCoin } from "../../../../utils/format";

function ItemProductOrder({ data }: { data: ItemProductOrderType }) {
    return (
        <>
            <div className="my-2 flex items-center">
                <div className="mx-3">
                    <img
                        className="h-[80px] w-[80px] object-cover"
                        src={data.productId.productThumbnail}
                        alt="Product"
                    />
                </div>
                <p className="ml-3 w-[160px] truncate text-[15px]  text-gray-500">{data.productId.productName}</p>
                <p className="text-[12px]">{`Size: ${data.size}, ${data.color ? "Color: " + data.color : ""}`}</p>
            </div>
            <div className="flex items-center justify-between">
                <p className="ml-3 text-[15px] text-gray-500">{formatCoin(data.price)}</p>
                <p className="text-[15px] text-gray-500">{data.quantity}</p>
                <p className="ml-3 text-[15px] text-gray-500">{formatCoin(data.price * data.quantity)}</p>
            </div>
        </>
    );
}

export default ItemProductOrder;
