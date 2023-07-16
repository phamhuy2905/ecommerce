import { useQuery } from "react-query";
import { formatCoin } from "../../utils/format";
import HeaderItemCart from "../Cart/components/HeaderItemCart";
import { getMyOrder } from "../../apis/order.api";
import ItemShop from "../CheckOut/components/ItemShop";
import NoteShop from "../../components/NoteShop";
import ItemProductOrder from "./components/ItemProductOrder";

function MyOrder() {
    const { data } = useQuery({
        queryKey: ["order"],
        queryFn: getMyOrder,
    });
    if (!data) {
        return <h1>Not order</h1>;
    }
    return (
        <div className="content">
            <h2 className="mb-5 mt-3 text-[30px] font-semibold text-gray-500">Đơn mua</h2>
            {data.map((order, keyIndex) => {
                return (
                    <div className="my-10 border-2 border-dashed border-[#ddd] bg-[#f5f5f5] py-3" key={keyIndex}>
                        <div className="content">
                            <div className="bg-white px-3 py-3">
                                <h4 className="mb-3 text-[20px] text-blue-600">Địa chỉ nhận hàng</h4>
                                <div className="flex items-center justify-between">
                                    <p className="text-[15px] text-gray-500">
                                        Phạm Trung Huy (+84) 782515479 566/43/17 Nguyễn Thái Sơn, Phường 5, Quận Gò Vấp,
                                        TP. Hồ Chí Minh
                                    </p>
                                </div>
                            </div>
                            <div>
                                <HeaderItemCart checkbox={false} />
                                {order.shopOrders.map((val, index) => {
                                    const total = val.itemProducts.reduce(
                                        (acc, curr) => acc + curr.quantity * curr.price,
                                        0
                                    );
                                    return (
                                        <div key={index} className="my-3 bg-white px-3 py-3">
                                            <ItemShop shopName={val.shopId.fullName} shopId={val.shopId._id} />
                                            <div className="grid grid-cols-2">
                                                {val.itemProducts.map((item, _index) => {
                                                    return <ItemProductOrder key={_index} data={item} />;
                                                })}
                                            </div>
                                            <div className="grid grid-cols-2 px-2 py-3">
                                                <NoteShop
                                                    shopId={val.shopId._id}
                                                    disabled={true}
                                                    value={val.noteShop || "Nothing!"}
                                                />
                                                <div className="flex items-center justify-end">
                                                    <p className="mr-2 text-[14px] text-gray-500">
                                                        Tổng số tiền ({val.itemProducts.length + " "}
                                                        sản phẩm):
                                                    </p>
                                                    <p className="text-[14px] text-orange-500">{formatCoin(total)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="flex justify-end">
                                <button className="rounded-[7px]  px-5 py-2 text-right text-[15px] text-blue-500">
                                    {`Thành tiền:  ${formatCoin(order.orderCheckOut.totalBalance)}`}
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default MyOrder;
