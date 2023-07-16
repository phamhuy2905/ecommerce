import { useNavigate, useParams } from "react-router-dom";
import HeaderItemCart from "../Cart/components/HeaderItemCart";
import ItemCheckOut from "./components/ItemCheckOut";
import Votcher from "./components/Votcher";
import { CheckOutType } from "../../types/checkout.type";
import { formatCoin } from "../../utils/format";
import ItemShop from "./components/ItemShop";
import { useMemo, useEffect } from "react";
import NoteShop from "../../components/NoteShop";
import { RootState, useAppDispatch } from "../../redux/store";
import { checkOutReview, createOrder } from "../../redux/checkout.slice";
import { useSelector } from "react-redux";
import { updateCartAfterOrder } from "../../redux/cart.slice";
import toast from "react-hot-toast";
import { errorResponse } from "../../utils/error";
import Address from "../../components/Address";

function CheckOut() {
    const navigate = useNavigate();
    const { state } = useParams<{ state: string }>();
    if (!state) {
        navigate("/");
        return;
    }
    const dispatch = useAppDispatch();
    const { shopOrders } = useSelector((state: RootState) => state.discount);
    let decodeData;
    let data: CheckOutType;
    try {
        decodeData = atob(decodeURIComponent(state));
        data = JSON.parse(decodeData);
    } catch (error) {
        navigate("/", {
            state: "Hahaha phá à cu???",
        });
        return;
    }
    const { totalPrice, totalBalance, totalDiscount } = useMemo(() => {
        const totalPrice = shopOrders
            .flatMap((val) => val.itemProducts)
            .reduce((acc, curr) => acc + +curr.price * +curr.quantity, 0);
        const totalDiscount = shopOrders
            .flatMap((val) => val.itemProducts)
            .reduce((acc, curr) => acc + curr.discountValue, 0);
        const totalBalance = totalPrice - totalDiscount;
        return {
            totalPrice,
            totalDiscount,
            totalBalance,
        };
    }, [shopOrders]);
    const handleCreateOrder = () => {
        dispatch(createOrder({ shopOrders }))
            .unwrap()
            .then(() => {
                const updateCart = shopOrders
                    .flatMap((val) => val.itemProducts)
                    .map((val) => ({ productId: val.productId, color: val.color, size: val.size }));
                dispatch(updateCartAfterOrder(updateCart));
                navigate("/", {
                    state: "Đặt hàng thành công!",
                });
            })
            .catch((err) => {
                const error = errorResponse(err);
                if (error) toast.error(error);
            });
    };
    useEffect(() => {
        dispatch(checkOutReview(data));
    }, []);

    return (
        <div className="bg-[#f5f5f5] py-10">
            <div className="content">
                <h2 className="mb-5 text-[30px] font-semibold">Thanh toán</h2>
                <Address />
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
                            <Votcher discountShop={val.shopId} />
                            <div className="grid grid-cols-2 px-2 py-3">
                                <NoteShop shopId={val.shopId} />
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
                        {`Tổng tiền khi chưa áp dụng votcher:  ${formatCoin(totalPrice)}`}
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
                    <button
                        className="rounded-[7px] bg-blue-500 px-5 py-2 text-right text-[15px] text-white"
                        onClick={handleCreateOrder}
                    >
                        Thanh toán
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CheckOut;
