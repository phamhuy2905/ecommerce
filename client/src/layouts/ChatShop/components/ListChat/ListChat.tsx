import { useEffect } from "react";
import date from "date-and-time";
import { AiOutlineSearch } from "react-icons/ai";
import { useAuthContext } from "../../../../context/auth.context";
import { RootState, useAppDispatch } from "../../../../redux/store";
import { chooseShopChat, setDataLatestMessage } from "../../../../redux/actions/chat.slice";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import { getLatestMessage } from "../../../../apis/chat.api";

function ListChat() {
    const { profile } = useAuthContext();
    const { listOnline, dataLatestMessage } = useSelector((state: RootState) => state.chat);
    if (!profile) return;
    const dispatch = useAppDispatch();
    const handleShowMessage = (shopId: string, shopName: string) => {
        dispatch(chooseShopChat({ senderId: profile._id, recevierId: shopId, nameRecevier: shopName, message: "" }));
    };
    const { data } = useQuery({
        queryKey: ["latest", profile._id],
        queryFn: () => getLatestMessage({ userId: profile._id }),
        enabled: profile._id ? true : false,
    });
    useEffect(() => {
        if (data) dispatch(setDataLatestMessage(data));
    }, [data]);

    return (
        <div className=" flex h-full w-[35%] flex-col justify-start border-r-[1px] border-[#ddd] pt-2 ">
            <div className="px-2">
                <div className="flex items-center border-[1px] border-[#ddd] py-1">
                    <AiOutlineSearch className="ml-2 text-[16px] text-gray-500" />
                    <input
                        className="px-2 text-[14px]  text-gray-600 outline-none "
                        type="text"
                        placeholder="Tìm kiếm"
                    />
                </div>
            </div>
            <div className="mt-2 overflow-y-auto ">
                {dataLatestMessage.map((val, index) => {
                    const recevier = profile._id === val.senderId._id ? val.recevierId : val.senderId;
                    const isOnline = listOnline.map((item) => item.userId).includes(recevier._id);
                    return (
                        <div
                            key={index}
                            className=" relative mt-1 flex cursor-pointer bg-[#ebebeb] px-1 py-2"
                            onClick={() => handleShowMessage(recevier._id, recevier.fullName)}
                        >
                            <div className=" mt-2 h-[30px] w-[30px] overflow-hidden rounded-full">
                                <img
                                    className="h-full w-full object-cover"
                                    src="https://cf.shopee.vn/file/20f2da4a07fa4f4c508ca468faf6319b_tn"
                                    alt=""
                                />
                            </div>
                            <div className="ml-2">
                                <p className="mb-1 text-[14px]">{recevier.fullName}</p>
                                <p
                                    className={`w-[140px] truncate text-[13px] text-gray-600 ${
                                        val.isReaded ? "" : "font-bold"
                                    }`}
                                >
                                    {val.message}
                                </p>
                            </div>
                            <p className="ml-2 text-[13px] text-gray-500">
                                {date.format(new Date(val.createdAt), "HH:mm")}
                            </p>
                            {isOnline && (
                                <p className="absolute right-[20%] top-[50%] h-[10px] w-[10px] translate-y-[-50%] rounded-full bg-green-600"></p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ListChat;
