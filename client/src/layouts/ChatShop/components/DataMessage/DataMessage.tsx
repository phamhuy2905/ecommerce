import { FiChevronDown } from "react-icons/fi";
import MessageMe from "../MessageMe";
import MessageMoment from "../MessageMoment";
import MessageClient from "../MessageClient";
import FormChat from "../FormChat";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../../redux/store";
import { useQuery } from "react-query";
import { useAuthContext } from "../../../../context/auth.context";
import { getMessage } from "../../../../apis/chat.api";
import { useEffect } from "react";
import moment from "moment";
import { setDataMessage } from "../../../../redux/actions/chat.slice";
import { useState, useMemo, useRef } from "react";

function DataMessage() {
    let isOk: boolean = true;
    const { profile } = useAuthContext();
    const dispatch = useAppDispatch();
    const refScroll = useRef<HTMLDivElement>(null);
    if (!profile) return;
    const { data, dataMessage, listOnline } = useSelector((state: RootState) => state.chat);
    const [isOnline, setIsOnline] = useState(false);
    const { data: dataQuery } = useQuery({
        queryKey: ["message", profile._id, data.recevierId],
        queryFn: () => getMessage({ recevierId: profile._id, senderId: data.recevierId }),
        enabled: data.recevierId ? true : false,
    });
    useMemo(() => {
        if (dataMessage.length) {
            const dataMessageFilter = [...dataMessage].filter((val) => val.senderId === data.recevierId);
            if (!dataMessageFilter.length) {
                setIsOnline(false);
                return;
            }
            const { recevierId, senderId } = dataMessageFilter[0].data[0];
            const check = listOnline.findIndex((val) => {
                if ((val.userId === recevierId._id || val.userId === senderId._id) && val.userId !== profile._id) {
                    return true;
                } else if (
                    (val.userId === senderId._id || val.userId === recevierId._id) &&
                    val.userId !== profile._id
                ) {
                    return true;
                } else {
                    false;
                }
            });
            check !== -1 ? setIsOnline(true) : setIsOnline(false);
        }
    }, [dataMessage, listOnline]);

    useEffect(() => {
        if (dataQuery) dispatch(setDataMessage(dataQuery));
        setTimeout(() => {
            refScroll.current?.scrollTo({ top: refScroll.current.scrollHeight });
        }, 0);
    }, [dataQuery]);

    useEffect(() => {
        setTimeout(() => {
            refScroll.current?.scrollTo({ top: refScroll.current.scrollHeight });
        }, 0);
    }, [dataMessage]);

    return (
        <div className="relative h-full w-[65%]">
            {data.recevierId ? (
                <div>
                    <div className="flex cursor-pointer items-center  justify-between border-b-[1px] border-[#ddd] px-2 py-2">
                        <div className="flex items-center">
                            <p className="text-[14px] text-gray-600">{data.nameRecevier}</p>
                            <FiChevronDown className="text-[18px] text-gray-600" />
                        </div>
                        <div className="mr-2 flex items-center">
                            {isOnline ? (
                                <>
                                    <p className="mr-2 text-[13px] text-gray-500">Đang hoạt động</p>
                                    <p className="h-[10px] w-[10px] rounded-full bg-green-500 "></p>
                                </>
                            ) : (
                                <>
                                    <p className="mr-2 text-[13px] text-gray-500">Offline</p>
                                    <p className="h-[10px] w-[10px] rounded-full bg-gray-500 "></p>
                                </>
                            )}
                        </div>
                    </div>
                    <div ref={refScroll} className="h-[350px] overflow-y-scroll px-2 py-2 ">
                        {dataMessage?.map((item, key) => {
                            if (item.senderId === data.recevierId) {
                                return (
                                    <div key={key}>
                                        {item.data.map((val, index) => {
                                            if (index > 0 && index <= item.data.length - 1) {
                                                const timePre = new Date(item.data[index - 1].createdAt).getTime();
                                                const timeCur = new Date(item.data[index].createdAt).getTime();
                                                if (timeCur / 60000 - timePre / 60000 >= 10) {
                                                    isOk = true;
                                                }
                                            }
                                            return (
                                                <div key={index}>
                                                    {isOk === true && (
                                                        <MessageMoment
                                                            message={moment(val.createdAt).startOf("minute").fromNow()}
                                                        />
                                                    )}
                                                    {(isOk = false)}
                                                    {val.senderId._id === profile._id ? (
                                                        <MessageMe message={val.message} />
                                                    ) : (
                                                        <MessageClient message={val.message} />
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                );
                            }
                        })}
                    </div>
                    <FormChat />
                </div>
            ) : (
                <div className="flex h-full flex-col items-center justify-center">
                    <img
                        className="h-[35px] w-[135px]"
                        src="https://shofy-client.vercel.app/_next/static/media/logo.414c93a2.svg"
                        alt=""
                    />
                    <p className="mt-3 text-[18px] font-semibold">Xin Chào!</p>
                </div>
            )}
        </div>
    );
}

export default DataMessage;
