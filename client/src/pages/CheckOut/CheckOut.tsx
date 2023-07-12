import { useNavigate, useParams } from "react-router-dom";
import HeaderItemCart from "../Cart/components/HeaderItemCart";
import ItemCheckOut from "./components/ItemCheckOut";
import Votcher from "./components/Votcher";
import { CheckOutType } from "../../types/checkout.type";
import { formatCoin } from "../../utils/format";
import { checkoutApi } from "../../apis/checkout.api";
import ItemShop from "./components/ItemShop";
import { useMemo, useState, useCallback } from "react";

let dataDiscount: { shopId?: string; discountCode?: string }[] = [];
function CheckOut() {
    const navigate = useNavigate();
    const { state } = useParams<{ state: string }>();
    if (!state) {
        navigate("/");
        return;
    }
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [totalBalance, setTotalBalance] = useState(0);
    const data: CheckOutType = JSON.parse(atob(decodeURIComponent(state)));
    const handleTest = useCallback(async ({ shopId, discountCode }: { shopId?: string; discountCode?: string }) => {
        dataDiscount =
            dataDiscount.findIndex((val) => val.shopId === shopId) === -1
                ? [...dataDiscount, { shopId, discountCode }]
                : [...dataDiscount];
        const items = [...data.shopOrders].map((val) => {
            return {
                shopId: val.shopId,
                itemProducts: val.itemProducts.map((item) => {
                    const checkCode = dataDiscount.findIndex((value) => value.shopId === val.shopId);
                    return {
                        productId: item.productId,
                        price: item.price,
                        quantity: item.quantity,
                        size: item.size,
                        color: item.color,
                        discountCode: checkCode === -1 ? null : dataDiscount[checkCode].discountCode,
                    };
                }),
            };
        });
        const body = { shopOrders: items };
        const reviewOrder = await checkoutApi(body);
        setTotalBalance(reviewOrder.dataTotal.totalBalance);
        setTotalDiscount(reviewOrder.dataTotal.totalDiscount);
    }, []);

    const total = useMemo(() => {
        return data.shopOrders
            .flatMap((val) => val.itemProducts)
            .reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
    }, []);
    return (
        <div className="bg-[#f5f5f5] py-10">
            <div className="content">
                <h2 className="mb-5 text-[30px] font-semibold">Thanh toán</h2>
                <div className="bg-white px-3 py-3">
                    <h4 className="mb-3 text-[20px] text-blue-600">Địa chỉ nhận hàng</h4>
                    <div className="flex items-center justify-between">
                        <p className="text-[15px] text-gray-500">
                            Phạm Trung Huy (+84) 782515479 566/43/17 Nguyễn Thái Sơn, Phường 5, Quận Gò Vấp, TP. Hồ Chí
                            Minh
                        </p>
                        <button className="text-[15px] text-blue-400 underline">Chỉnh sửa</button>
                    </div>
                </div>
                <HeaderItemCart checkbox={false} />
                {data.shopOrders.map((val, index) => {
                    const total = val.itemProducts.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);
                    return (
                        <div key={index} className="my-3 bg-white px-3 py-3">
                            <ItemShop shopName={val.shopName} shopId={val.shopId} />
                            <div className="grid grid-cols-2">
                                {val.itemProducts.map((item, _index) => {
                                    return <ItemCheckOut key={_index} data={item} />;
                                })}
                            </div>
                            <Votcher handleTest={handleTest} discountShop={val.shopId} />
                            <div className="grid grid-cols-2 px-2 py-3">
                                <div className="flex items-center ">
                                    <p className="mr-2 text-[14px]">Lời nhắn:</p>
                                    <input
                                        className="flex-1 border-[1px] border-[#ddd] px-2 py-2 text-[13px] outline-none"
                                        type="text"
                                        placeholder="Lưu ý cho người bán"
                                    />
                                </div>
                                <div className="flex items-center justify-end">
                                    <p className="mr-2 text-[14px] text-gray-500">Tổng số tiền (8 sản phẩm):</p>
                                    <p className="text-[14px] text-orange-500">{formatCoin(total)}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div className="flex justify-end">
                    <button className="rounded-[7px]  px-5 py-2 text-right text-[15px] text-blue-500">
                        {`Tổng tiền khi chưa áp dụng votcher:  ${formatCoin(total)}`}
                    </button>
                </div>
                <div className="flex justify-end">
                    <button className="rounded-[7px]  px-5 py-2 text-right text-[15px] text-blue-500">
                        {`Tổng tiền được giảm giá: ${formatCoin(totalDiscount)}`}
                    </button>
                </div>
                <div className="flex justify-end">
                    <button className="rounded-[7px]  px-5 py-2 text-right text-[15px] text-blue-500">
                        {`Tổng cộng:  ${formatCoin(totalBalance)}`}
                    </button>
                </div>
                <div className="flex justify-end">
                    <button className="rounded-[7px] bg-blue-500 px-5 py-2 text-right text-[15px] text-white">
                        Thanh toán
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CheckOut;
