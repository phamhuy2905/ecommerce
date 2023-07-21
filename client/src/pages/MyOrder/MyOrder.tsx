import { useMutation, useQuery } from "react-query";
import { formatCoin } from "../../utils/format";
import HeaderItemCart from "../Cart/components/HeaderItemCart";
import {
    CancelOrderByUser,
    cancelOrderByUser as cancelOrderByUserApi,
    getMyOrder,
    requestCancelByUser,
} from "../../apis/order.api";
import ItemShop from "../CheckOut/components/ItemShop";
import NoteShop from "../../components/NoteShop";
import ItemProductOrder from "./components/ItemProductOrder";
import TextAddress from "../../components/TextAddress";
import TextInfomation from "../../components/TextInfomation/TextInfomation";
import ButtonStatusOrder from "../../components/ButtonStatusOrder";
import Popper from "../../components/Popper";
import { useState } from "react";
import { queryClient } from "../../main";
import FormConfirm from "../../components/FormConfirm";

function MyOrder() {
    const [reasonCancel, setReasonCancel] = useState<string>("");
    const [ishiddenFormConfirm, setIsHiddentFormConfirm] = useState<boolean>(true);
    const [shopId, setShopId] = useState<string>("");
    const [idOrder, setIdOrder] = useState<string>("");
    const { data } = useQuery({
        queryKey: ["order"],
        queryFn: getMyOrder,
    });
    const cancelOrderByUser = useMutation({
        mutationKey: ["cancelOrderByUserApi"],
        mutationFn: cancelOrderByUserApi,
    });
    const requestCancel = useMutation({
        mutationKey: ["cancelOrderByUserApi"],
        mutationFn: requestCancelByUser,
    });
    const handleConfirmCancelOrderByUser = ({ id, data }: { id: string; data: CancelOrderByUser }) => {
        cancelOrderByUser.mutate(
            { id, data },
            {
                onSuccess: () => {
                    setIsHiddentFormConfirm(true);
                    setReasonCancel("");
                    setIdOrder("");
                    setShopId("");
                    queryClient.refetchQueries({
                        queryKey: ["order"],
                    });
                },
            }
        );
    };
    const handleRequestCancel = ({ id, shopId }: { id: string; shopId: string }) => {
        requestCancel.mutate(
            { id, shopId },
            {
                onSuccess: () => {
                    queryClient.refetchQueries({
                        queryKey: ["order"],
                    });
                },
            }
        );
    };
    if (!data) return <h1>Not order</h1>;
    return (
        <div className="content">
            <h2 className="mb-5 mt-3 text-[30px] font-semibold text-gray-500">Đơn mua</h2>
            {data.map((order, keyIndex) => {
                return (
                    <div className="my-10 border-2 border-dashed border-[#ddd] bg-[#f5f5f5] py-3" key={keyIndex}>
                        <div className="content">
                            <div className="bg-white px-3 py-3">
                                <h4 className="mb-3 text-[20px] text-blue-600">Thông tin nhận hàng</h4>
                                <div className="flex items-center justify-between">
                                    <TextInfomation {...order.orderShipping} />
                                    <TextAddress {...order.orderShipping} />
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
                                            <div className="flex items-center justify-between">
                                                <ItemShop shopName={val.shopId.fullName} shopId={val.shopId._id} />
                                                <div className="flex items-center">
                                                    <p className="mr-3 text-[15px] text-gray-500">
                                                        Trạng thái đơn hàng:
                                                    </p>
                                                    <ButtonStatusOrder statusOrder={val.orderStatus} />
                                                </div>
                                            </div>
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
                                            <div className="mt-2 flex items-center justify-between">
                                                <div className="flex items-center"></div>
                                                {val.orderStatus === "pending" && (
                                                    <Popper
                                                        title="Hủy đơn"
                                                        onClick={() => {
                                                            setShopId(val.shopId._id);
                                                            setIdOrder(order._id);
                                                            setIsHiddentFormConfirm(false);
                                                        }}
                                                        className=" bg-red-500 "
                                                    />
                                                )}
                                                {val.orderStatus === "confirmed" && !val.requestCancel && (
                                                    <Popper
                                                        title="Yêu cầu hủy đơn"
                                                        onClick={() => {
                                                            handleRequestCancel({
                                                                id: order._id,
                                                                shopId: val.shopId._id,
                                                            });
                                                        }}
                                                        className=" bg-red-500 "
                                                    />
                                                )}
                                                {val.orderStatus === "confirmed" && val.requestCancel && (
                                                    <Popper title="Đã yêu cầu hủy đơn" className=" bg-gray-400 " />
                                                )}
                                            </div>
                                            {(val.orderStatus === "cancel_by_admin" ||
                                                val.orderStatus === "cancel_by_user" ||
                                                val.orderStatus === "cancel_by_shop") && (
                                                <div className="mt-2 flex items-center">
                                                    <p className="mr-2 text-[14px] text-gray-500">Lí do hủy:</p>
                                                    <p className="mr-2 text-[14px] text-gray-500">
                                                        {val.reasonCancel || "Unknow"}
                                                    </p>
                                                </div>
                                            )}
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
            {!ishiddenFormConfirm && (
                <FormConfirm
                    value={reasonCancel}
                    setValue={setReasonCancel}
                    handleConfirm={() =>
                        handleConfirmCancelOrderByUser({ id: idOrder, data: { reasonCancel, shopId } })
                    }
                />
            )}
        </div>
    );
}

export default MyOrder;
