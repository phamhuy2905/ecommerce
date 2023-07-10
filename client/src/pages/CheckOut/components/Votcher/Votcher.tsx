import date from "date-and-time";
import { CiDiscount1 } from "react-icons/ci";
import Tippy from "@tippyjs/react/headless";

import { useState } from "react";
import { useQuery } from "react-query";
import { getDiscount } from "../../../../apis/discount.api";
import { formatCoin } from "../../../../utils/format";
import { queryClient } from "../../../../main";
function Votcher({ discountShop }: { discountShop: string }) {
    const [call, setCall] = useState<boolean>(false);
    const { data } = useQuery({
        queryKey: ["discount", discountShop],
        queryFn: () => getDiscount(discountShop),
        enabled: call,
    });

    const handleDiscount = () => {
        setCall(true);
        queryClient.invalidateQueries({
            queryKey: ["discount", discountShop],
        });
    };
    return (
        <div className="flex justify-end border-t-[1px] border-t-gray-300 px-2 py-2">
            <div className="flex w-[50%] items-center justify-between">
                <p className="flex items-center">
                    <CiDiscount1 className="text-orange-500" />
                    <span className="ml-2 text-[15px]">Chọn votcher của shop</span>
                </p>
                <Tippy
                    interactive
                    trigger="click"
                    placement="left-start"
                    hideOnClick
                    render={() => {
                        return (
                            <div className="w-[550px] rounded-[5px] border-[1px] border-[#ddd] bg-white px-2 ">
                                <div className="my-3 flex items-center justify-between bg-[#f5f5f5] px-2 ">
                                    <p className="text-[14px] text-gray-400">Mã votcher</p>
                                    <input
                                        className="mx-2 flex-1 rounded-[5px] border-[1px] border-[#ddd] px-2 py-2 text-[13px] outline-none"
                                        type="text"
                                        placeholder="Nhập mã voucher của Shop"
                                    />
                                    <button className="rounded-[5px] bg-blue-500 px-2 py-1 text-[14px] text-white">
                                        Áp dụng
                                    </button>
                                </div>
                                {data?.length ? (
                                    data.map((val, index) => {
                                        return (
                                            <div key={index}>
                                                <div className="flex border-t-[1px] border-[#ddd] px-1 ">
                                                    <div className="flex w-[25%] flex-col justify-center border-r-[1px] border-[#ddd]">
                                                        <p className="mb-2 text-[14px]">Mã votcher</p>
                                                        <p className="text-[13px] font-semibold">{val.discountCode}</p>
                                                    </div>
                                                    <div className="flex w-[75%] items-center justify-between px-2 py-2">
                                                        <p className="flex flex-col text-[13px] text-gray-500">
                                                            <span>Giảm {formatCoin(val.discountValue)}</span>
                                                            <span>
                                                                Đơn Tối Thiểu {formatCoin(val.discountMinOrderValue)}
                                                            </span>
                                                            <span>Số lần được áp dụng {val.discoutMaxEachUser}</span>
                                                            <span>Số lần đã áp dụng {val.discountCountUsed}</span>
                                                            <span>
                                                                Hạn sử dụng:
                                                                {" " +
                                                                    date.format(
                                                                        new Date(val.discountEndDate),
                                                                        "YYYY/MM/DD "
                                                                    )}
                                                            </span>
                                                        </p>
                                                        <button className="rounded-[5px] bg-blue-500 px-2 py-1 text-[14px] text-white">
                                                            Lưu
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="mb-3 flex flex-col items-center">
                                        <svg
                                            width={200}
                                            height={200}
                                            viewBox="0 0 140 140"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M0 0H140V140H0V0Z"
                                                fill="white"
                                                fillOpacity="0.01"
                                            />
                                            <path
                                                d="M63 115C65.2091 115 67 113.209 67 111C67 108.791 65.2091 107 63 107C60.7909 107 59 108.791 59 111C59 113.209 60.7909 115 63 115Z"
                                                stroke="#E8E8E8"
                                                strokeWidth={2}
                                            />
                                            <path
                                                d="M77 23C79.2091 23 81 21.2091 81 19C81 16.7909 79.2091 15 77 15C74.7909 15 73 16.7909 73 19C73 21.2091 74.7909 23 77 23Z"
                                                stroke="#E8E8E8"
                                                strokeWidth={2}
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M123 92C123.552 92 124 92.4477 124 93V95.999L127 96C127.552 96 128 96.4477 128 97C128 97.5523 127.552 98 127 98H124V101C124 101.552 123.552 102 123 102C122.448 102 122 101.552 122 101V98H119C118.448 98 118 97.5523 118 97C118 96.4477 118.448 96 119 96H122V93C122 92.4477 122.448 92 123 92Z"
                                                fill="#E8E8E8"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M39 23C39.5523 23 40 23.4477 40 24V26.999L43 27C43.5523 27 44 27.4477 44 28C44 28.5523 43.5523 29 43 29H40V32C40 32.5523 39.5523 33 39 33C38.4477 33 38 32.5523 38 32V29H35C34.4477 29 34 28.5523 34 28C34 27.4477 34.4477 27 35 27H38V24C38 23.4477 38.4477 23 39 23Z"
                                                fill="#E8E8E8"
                                            />
                                            <path
                                                d="M90.3995 59.4263C90.9853 58.8405 90.9853 57.8908 90.3995 57.305C89.8137 56.7192 88.864 56.7192 88.2782 57.305L67.065 78.5182C66.4792 79.104 66.4792 80.0537 67.065 80.6395C67.6508 81.2253 68.6005 81.2253 69.1863 80.6395L90.3995 59.4263Z"
                                                fill="#BDBDBD"
                                            />
                                            <path
                                                d="M70 67C73.3137 67 76 64.3137 76 61C76 57.6863 73.3137 55 70 55C66.6863 55 64 57.6863 64 61C64 64.3137 66.6863 67 70 67Z"
                                                stroke="#BDBDBD"
                                                strokeWidth={3}
                                            />
                                            <path
                                                d="M88 83C91.3137 83 94 80.3137 94 77C94 73.6863 91.3137 71 88 71C84.6863 71 82 73.6863 82 77C82 80.3137 84.6863 83 88 83Z"
                                                stroke="#BDBDBD"
                                                strokeWidth={3}
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M110 43C112.209 43 114 44.7909 114 47V60C109.029 60 105 64.0294 105 69C105 73.9706 109.029 78 114 78V91C114 93.2091 112.209 95 110 95H30C27.7909 95 26 93.2091 26 91V78C30.9706 78 35 73.9706 35 69C35 64.0294 30.9706 60 26 60V47C26 44.7909 27.7909 43 30 43H110Z"
                                                stroke="#BDBDBD"
                                                strokeWidth={2}
                                            />
                                            <path
                                                d="M50.5 47H48.5C47.6716 47 47 47.6716 47 48.5V89.5C47 90.3284 47.6716 91 48.5 91H50.5C51.3284 91 52 90.3284 52 89.5V48.5C52 47.6716 51.3284 47 50.5 47Z"
                                                fill="#E8E8E8"
                                            />
                                        </svg>
                                        <h4 className="mt-1 text-[15px]">Chưa có mã giảm giá nào của Shop</h4>
                                        <p className="text-center text-[14px] text-gray-500">
                                            Nhập mã giảm giá có thể sử dụng vào thanh bên trên
                                        </p>
                                    </div>
                                )}
                            </div>
                        );
                    }}
                >
                    <p
                        onClick={handleDiscount}
                        className="cursor-pointer select-none text-[14px] text-blue-500 underline"
                    >
                        Chọn votcher
                    </p>
                </Tippy>
            </div>
        </div>
    );
}

export default Votcher;
