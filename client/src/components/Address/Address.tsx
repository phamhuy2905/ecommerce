import { FiPlus } from "react-icons/fi";
import { useState } from "react";
import Modal from "../../Admin/components/Modal";
import AddressForm from "../AddressForm";
function Address() {
    const [isOpenModal, setIsOpenModal] = useState<boolean>(true);
    const [isNewAddress, setIsNewAddress] = useState<boolean>(false);

    return (
        <div className="bg-white px-3 py-3">
            <h4 className="mb-3 text-[20px] text-blue-600">Địa chỉ nhận hàng</h4>
            <div className="flex items-center justify-between">
                <p className="text-[15px] text-gray-500">
                    Phạm Trung Huy (+84) 782515479 566/43/17 Nguyễn Thái Sơn, Phường 5, Quận Gò Vấp, TP. Hồ Chí Minh
                </p>
                <button className="text-[15px] text-blue-400 underline">Chỉnh sửa</button>
            </div>
            <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal} width="w-[35%]">
                {!isNewAddress ? (
                    <>
                        <h4 className="my-2 text-[17px] text-gray-800">Địa Chỉ Của Tôi</h4>
                        <div className="border-t-[1px] border-gray-400 py-3 ">
                            <div className="flex items-start border-b-[1px] border-[#ddd] px-3 py-3">
                                <input type="radio" className="mt-2 h-[20px] w-[20px]" />
                                <div className="mx-2 flex flex-1 flex-col items-start ">
                                    <div className="flex items-center">
                                        <p className="text-[15px]">Phạm Trung Huy</p>
                                        <p className="text-[14px] text-gray-500">(+84) 782515479</p>
                                    </div>
                                    <span className="my-2 text-[13px] text-gray-400">
                                        Chung Cư Topaz Home 2, Block A1, Đường 154 Quận 9 Phường Tân Phú, Thành Phố Thủ
                                        Đức, TP. Hồ Chí Minh
                                    </span>
                                    <p className="border-[1px] border-blue-500 px-2 py-1 text-[13px] text-blue-400">
                                        Mặc định
                                    </p>
                                </div>
                                <button className="whitespace-nowrap text-[14px] text-orange-500">Cập nhật</button>
                            </div>
                        </div>
                        <button className="mt-2 flex items-center justify-start border-[1px] border-[#ddd] px-2 py-2">
                            <FiPlus className="text-[20px] text-gray-500 " />
                            <span className="ml-2 text-[14px]" onClick={() => setIsNewAddress(true)}>
                                Thêm địa chỉ mới
                            </span>
                        </button>
                    </>
                ) : (
                    <AddressForm />
                )}
                {!isNewAddress ? (
                    <div className="fixed bottom-0 left-0 flex  w-full justify-center border-t-[1px] border-[#ddd] py-3">
                        <button className=" mr-3 min-w-[90px] cursor-pointer  border-[1px] border-[#ddd] px-3 py-2 text-center text-gray-500">
                            Hủy
                        </button>
                        <button className="min-w-[90px] cursor-pointer border-transparent bg-blue-500 px-3 py-2 text-center text-white">
                            Xác nhận
                        </button>
                    </div>
                ) : (
                    <div className="fixed bottom-0 left-0 flex  w-full justify-center border-t-[1px] border-[#ddd] py-3">
                        <button
                            className=" mr-3 min-w-[90px] cursor-pointer  border-[1px] border-[#ddd] px-3 py-2 text-center text-gray-500"
                            onClick={() => setIsNewAddress(false)}
                        >
                            Trở lại
                        </button>
                        <button className="min-w-[90px] cursor-pointer border-transparent bg-blue-500 px-3 py-2 text-center text-white">
                            Hoàn thành
                        </button>
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default Address;
