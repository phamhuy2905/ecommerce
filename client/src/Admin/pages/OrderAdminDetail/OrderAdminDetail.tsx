import { formatCoin } from "../../../utils/format";
import { useMutation, useQuery } from "react-query";
import HeaderItemCart from "../../../pages/Cart/components/HeaderItemCart";
import ItemShop from "../../../pages/CheckOut/components/ItemShop";
import ItemProductOrder from "../../../pages/MyOrder/components/ItemProductOrder";
import NoteShop from "../../../components/NoteShop";
import { useParams } from "react-router-dom";
import {
    acceptCancelByAdmin,
    acceptOrder as acceptOrderApi,
    cancelOrderByAdmin,
    getOneOrder,
} from "../../apis/order.api";
import { CancelOrderByAdmin } from "../../types/order.type";
import { useState } from "react";
import { queryClient } from "../../../main";
import FormConfirm from "../../../components/FormConfirm";
import TextAddress from "../../../components/TextAddress";
import TextInfomation from "../../../components/TextInfomation/TextInfomation";
import ButtonStatusOrder from "../../../components/ButtonStatusOrder";
import Popper from "../../../components/Popper";
function OrderAdminDetail() {
    const param = useParams<{ id: string }>();
    const [reasonCancel, setReasonCancel] = useState<string>("");
    const [ishiddenFormConfirm, setIsHiddentFormConfirm] = useState<boolean>(true);
    const [shopId, setShopId] = useState<string>("");
    if (!param.id) return;
    const { data } = useQuery({
        queryKey: ["orderDetailAdmin"],
        queryFn: () => getOneOrder(param.id!),
    });
    const { mutate } = useMutation({
        mutationKey: ["cancelOrderByAdmin"],
        mutationFn: cancelOrderByAdmin,
    });
    const acceptCancel = useMutation({
        mutationKey: ["cancelOrderByAdmin"],
        mutationFn: acceptCancelByAdmin,
    });
    const acceptOrder = useMutation({
        mutationKey: ["cancelOrderByAdmin"],
        mutationFn: acceptOrderApi,
    });
    const handleConfirmCalcelOrder = ({ id, data }: { id: string; data: CancelOrderByAdmin }) => {
        mutate(
            { id, data },
            {
                onSuccess: () => {
                    setIsHiddentFormConfirm(true);
                    setReasonCancel("");
                    setShopId("");
                    queryClient.refetchQueries({
                        queryKey: ["orderDetailAdmin"],
                    });
                },
            }
        );
    };
    const handleAcceptCancel = ({ id, shopId }: { id: string; shopId: string }) => {
        acceptCancel.mutate(
            { id, shopId },
            {
                onSuccess: () => {
                    queryClient.refetchQueries({
                        queryKey: ["orderDetailAdmin"],
                    });
                },
            }
        );
    };
    const handleAcceptOrder = ({ id, shopId }: { id: string; shopId: string }) => {
        acceptOrder.mutate(
            { id, shopId },
            {
                onSuccess: () => {
                    queryClient.refetchQueries({
                        queryKey: ["orderDetailAdmin"],
                    });
                },
            }
        );
    };
    if (!data) return <h1>Nothing order</h1>;
    return (
        <div className="content">
            <h2 className="mb-5 mt-3 text-[30px] font-semibold text-gray-500">Đơn mua</h2>
            <div className="my-10 border-2 border-dashed border-[#ddd] bg-[#f5f5f5] py-3">
                <div className="content">
                    <div className="bg-white px-3 py-3">
                        <h4 className="mb-3 text-[20px] text-blue-600">Thông tin nhận hàng</h4>
                        <div className="flex items-center justify-between">
                            <TextInfomation {...data.orderShipping} />
                            <TextAddress {...data.orderShipping} />
                        </div>
                    </div>
                    <div>
                        <HeaderItemCart checkbox={false} />
                        {data.shopOrders.map((val, index) => {
                            const total = val.itemProducts.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);
                            return (
                                <div key={index} className="my-3 bg-white px-3 py-3">
                                    <div className="flex items-center justify-between">
                                        <ItemShop shopName={val.shopId.fullName} shopId={val.shopId._id} />
                                        <div className="flex items-center">
                                            <p className="mr-3 text-[15px] text-gray-500">Trạng thái đơn hàng:</p>
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
                                        <div className="flex items-center">
                                            {val.orderStatus === "pending" ? (
                                                <>
                                                    <p className="mr-2 text-[15px] text-gray-500">Xác nhận đơn hàng:</p>
                                                    <Popper
                                                        title="Xác nhận"
                                                        className="bg-green-500"
                                                        onClick={() =>
                                                            handleAcceptOrder({
                                                                id: data._id,
                                                                shopId: val.shopId._id,
                                                            })
                                                        }
                                                    />
                                                </>
                                            ) : (
                                                <></>
                                            )}
                                            {val.requestCancel && val.orderStatus === "confirmed" ? (
                                                <>
                                                    <p className="mr-2 text-[15px] text-gray-500">
                                                        Người dùng yêu cầu hủy:
                                                    </p>
                                                    <Popper
                                                        title="Phê duyệt"
                                                        className="bg-teal-500"
                                                        onClick={() =>
                                                            handleAcceptCancel({
                                                                id: data._id,
                                                                shopId: val.shopId._id,
                                                            })
                                                        }
                                                    />
                                                </>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                        {(val.orderStatus === "pending" || val.orderStatus === "confirmed") && (
                                            <Popper
                                                title="Hủy đơn"
                                                onClick={() => {
                                                    setShopId(val.shopId._id);
                                                    setIsHiddentFormConfirm(false);
                                                }}
                                                className=" bg-red-500 "
                                            />
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
                            {`Thành tiền:  ${formatCoin(data.orderCheckOut.totalBalance)}`}
                        </button>
                    </div>
                </div>
            </div>
            {!ishiddenFormConfirm && (
                <FormConfirm
                    value={reasonCancel}
                    setValue={setReasonCancel}
                    handleConfirm={() => handleConfirmCalcelOrder({ id: data._id, data: { reasonCancel, shopId } })}
                />
            )}
        </div>
    );
}

export default OrderAdminDetail;
