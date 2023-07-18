import { FiPlus } from "react-icons/fi";
import { useState } from "react";
import Modal from "../../Admin/components/Modal";
import AddressForm from "../AddressForm";
import { useQuery } from "react-query";
import { memo } from "react";
import { getAddressDefaultUser, getAddressUser } from "../../apis/address.api";
import ItemAddress from "../ItemAddress";
import { useAppDispatch } from "../../redux/store";
import { confirmAddressId } from "../../redux/checkout.slice";
import { SaveAddressType } from "../../types/address.type";
function Address() {
    const dispatch = useAppDispatch();
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [isNewAddress, setIsNewAddress] = useState<boolean>(false);
    const [infoAddress, setInfoAddress] = useState<SaveAddressType>({
        id: "",
        province: "",
        district: "",
        ward: "",
        address: "",
        address2: "",
        fullName: "",
        phoneNumber: "",
        isDefault: false,
    });
    const { address, address2, fullName, phoneNumber, province, district, ward } = infoAddress;
    const { data: dataDefault } = useQuery({
        queryKey: ["address/default"],
        queryFn: getAddressDefaultUser,
        onSuccess: (data) => {
            const { _id, address, address2, fullName, phoneNumber, province, isDefault, district, ward } = data;
            setInfoAddress({ id: _id, address, address2, fullName, phoneNumber, province, isDefault, district, ward });
            dispatch(confirmAddressId(_id));
        },
    });
    const { data } = useQuery({
        queryKey: ["address"],
        queryFn: getAddressUser,
        enabled: isOpenModal,
    });
    return (
        <div className="bg-white px-3 py-3">
            <h4 className="mb-3 text-[20px] text-blue-600">Địa chỉ nhận hàng</h4>
            <div className="flex items-center justify-between">
                {dataDefault ? (
                    <div className="flex flex-col">
                        <p className="text-[15px] text-gray-500">Người nhận: {`${fullName} +84(${phoneNumber}) `}</p>
                        <p className="text-[15px] text-gray-500">
                            {`Địa chỉ: ${address2 ? address2 + ", " : ""} ${address}${", " + ward}${", " + district}${
                                ", " + province
                            }`}
                        </p>
                    </div>
                ) : (
                    <p className="text-[14px] italic text-red-500">Vui lòng nhập địa chỉ</p>
                )}
                <button className="text-[15px] text-blue-400 underline" onClick={() => setIsOpenModal(true)}>
                    {dataDefault ? "Chỉnh sửa" : "Nhập địa chỉ"}
                </button>
            </div>
            <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal} width="w-[35%]">
                {!isNewAddress ? (
                    <>
                        <h4 className="my-2 text-[17px] text-gray-800">Địa Chỉ Của Tôi</h4>
                        <div className="border-t-[1px] border-gray-400 py-3 ">
                            {data?.map((val, index) => {
                                return (
                                    <ItemAddress
                                        item={val}
                                        setInfoAddress={setInfoAddress}
                                        infoAddress={infoAddress}
                                        key={index}
                                    />
                                );
                            })}
                        </div>
                        <button
                            onClick={() => setIsNewAddress(true)}
                            className="mt-2 flex items-center justify-start border-[1px] border-[#ddd] px-2 py-2"
                        >
                            <FiPlus className="text-[20px] text-gray-500 " />
                            <span className="ml-2 text-[14px]">Thêm địa chỉ mới</span>
                        </button>
                    </>
                ) : (
                    <AddressForm setIsNewAddress={setIsNewAddress} setIsOpenModal={setIsOpenModal} />
                )}
                {!isNewAddress && (
                    <div className="fixed bottom-0 left-0 flex  w-full justify-center border-t-[1px] border-[#ddd] py-3">
                        <button
                            className=" mr-3 min-w-[90px] cursor-pointer  border-[1px] border-[#ddd] px-3 py-2 text-center text-gray-500"
                            onClick={() => setIsOpenModal(false)}
                        >
                            Hủy
                        </button>
                        <button
                            onClick={() => {
                                setIsOpenModal(false);
                                dispatch(confirmAddressId(infoAddress.id));
                            }}
                            className="min-w-[90px] cursor-pointer border-transparent bg-blue-500 px-3 py-2 text-center text-white"
                        >
                            Xác nhận
                        </button>
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default memo(Address);
