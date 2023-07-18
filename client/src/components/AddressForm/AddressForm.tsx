import { FiChevronDown } from "react-icons/fi";
import { useForm } from "react-hook-form";
import InputForm from "../InputForm";
import {
    AddressFormType,
    AddressVietNam,
    FoundAddressVietNam,
    HiddentAddressVietNam,
    addressFormRule,
} from "../../rules/address.rule";
import Tippy from "@tippyjs/react/headless";
import { useRef, useState, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { getDataVietNam } from "../../apis/service.api";
import { CreatedAddressType } from "../../types/address.type";
import { createdAddressByUser } from "../../apis/address.api";
import { queryClient } from "../../main";
import { errorResponse } from "../../utils/error";
import toast from "react-hot-toast";
const defaultValues = {
    fullName: "",
    phoneNumber: "",
    address2: "",
    address: "",
};
function AddressForm({
    setIsOpenModal,
    setIsNewAddress,
}: {
    setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    setIsNewAddress: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<AddressFormType>({ defaultValues });
    const btnRef = useRef<HTMLButtonElement[] | null[]>([]);
    const [messageErrorAddress, setMessageErrorAddress] = useState<string>("");
    const [isDefault, setIsDefault] = useState<boolean>(false);
    const [width, setWidth] = useState<number>(0);
    const [left, setLeft] = useState<number>(0);
    const [edit, setEdit] = useState<boolean>(false);
    const [newaddress, setNewAddress] = useState<AddressVietNam>({ province: "", district: "", ward: "" });
    const [foundAddress, setFoundAddress] = useState<FoundAddressVietNam>({ province: 0, district: 0, ward: 0 });
    const [isHiddentAddress, setIsHiddentAddress] = useState<HiddentAddressVietNam>({
        province: true,
        district: true,
        ward: true,
    });
    const [isHiddenTippy, setIsHiddentTippy] = useState<boolean>(false);
    const { data } = useQuery({
        queryKey: ["address/info"],
        queryFn: getDataVietNam,
        staleTime: Infinity,
        enabled: edit,
    });
    const { mutate } = useMutation({
        mutationKey: ["addAddress"],
        mutationFn: (data: CreatedAddressType) => createdAddressByUser(data),
    });

    const handleClickKeyMixed = (index: number, value: string, key: "province" | "district" | "ward") => {
        if (key === "province") {
            setFoundAddress({ district: 0, ward: 0, [key]: index });
            setNewAddress({ district: "", ward: "", [key]: value });
            setIsHiddentAddress({ district: false, ward: true, [key]: true });
            setWidth(btnRef.current[1]?.offsetWidth || 0);
            setLeft(btnRef.current[1]?.offsetLeft || 0);
        } else if (key === "district") {
            setFoundAddress({ ...foundAddress, ward: 0, [key]: index });
            setNewAddress({ ...newaddress, ward: "", [key]: value });
            setIsHiddentAddress({ province: true, ward: false, [key]: true });
            setWidth(btnRef.current[2]?.offsetWidth || 0);
            setLeft(btnRef.current[2]?.offsetLeft || 0);
        } else if (key === "ward") {
            setFoundAddress({ ...foundAddress, [key]: index });
            setNewAddress({ ...newaddress, [key]: value });
            setIsHiddentTippy(true);
            setIsHiddentAddress({ province: true, district: true, [key]: true });
            setMessageErrorAddress("");
            setWidth(btnRef.current[0]?.offsetWidth || 0);
            setLeft(btnRef.current[0]?.offsetLeft || 0);
            setTimeout(() => {
                setIsHiddentTippy(false);
            }, 100);
        }
    };
    const handleShowTippy = () => {
        const { district, province, ward } = newaddress;
        if (province && district && ward) {
            setIsHiddentAddress({ district: true, ward: true, province: false });
        }
    };
    const handleClickSideBarAddress = (key: "province" | "district" | "ward") => {
        if (key === "province") {
            setIsHiddentAddress({ district: true, ward: true, [key]: false });
            setWidth(btnRef.current[0]?.offsetWidth || 0);
            setLeft(btnRef.current[0]?.offsetLeft || 0);
        } else if (key === "district") {
            setIsHiddentAddress({ province: true, ward: true, [key]: false });
            setWidth(btnRef.current[1]?.offsetWidth || 0);
            setLeft(btnRef.current[1]?.offsetLeft || 0);
        } else if (key === "ward") {
            setIsHiddentAddress({ province: true, district: true, [key]: false });
            setWidth(btnRef.current[2]?.offsetWidth || 0);
            setLeft(btnRef.current[2]?.offsetLeft || 0);
        }
    };

    const handleSubmitForm = handleSubmit((data) => {
        const { address, address2 = "", fullName, phoneNumber } = data;
        const { province, district, ward } = newaddress;
        if (!province || !district || !ward) {
            setMessageErrorAddress("Vui lòng nhập địa chỉ");
            return;
        }
        mutate(
            { address, address2, fullName, phoneNumber: +phoneNumber, province, district, ward, isDefault },
            {
                onSuccess: () => {
                    queryClient.fetchQuery({ queryKey: ["address"] });
                    queryClient.fetchQuery({ queryKey: ["address/default"] });
                    setIsOpenModal(false);
                    setIsNewAddress(false);
                    toast.success("Thêm địa chỉ thành công!");
                },
                onError: (err) => {
                    const error = errorResponse(err);
                    error && toast.error(error);
                },
            }
        );
    });
    useEffect(() => {
        setWidth(btnRef.current[0]?.offsetWidth || 0);
        setLeft(btnRef.current[0]?.offsetLeft || 0);
    }, [edit]);
    return (
        <>
            <div className="select-none px-2 py-2">
                <h4 className="my-2 text-[17px] text-gray-800">Địa chỉ mới</h4>
                <div className="grid grid-cols-2 gap-4">
                    <InputForm
                        register={register}
                        name="fullName"
                        placeholder="Họ và tên"
                        title="Họ và tên"
                        rule={addressFormRule.fullName}
                        messageError={errors.fullName?.message}
                    />
                    <InputForm
                        register={register}
                        name="phoneNumber"
                        placeholder="Số điện thoại"
                        title="Số điện thoại"
                        rule={addressFormRule.phoneNumber}
                        messageError={errors.phoneNumber?.message}
                    />
                </div>
                <div>
                    <Tippy
                        interactive
                        trigger="click"
                        disabled={isHiddenTippy}
                        onShow={handleShowTippy}
                        render={() => {
                            return (
                                <div className="flex w-[466px] flex-col border-[1px] border-[#ddd] bg-white">
                                    <div className="relative grid grid-cols-3 justify-between border-b-[1px] border-[#ddd] px-2 py-2">
                                        <button
                                            ref={(ref) => (btnRef.current[0] = ref)}
                                            onClick={() => handleClickSideBarAddress("province")}
                                            className="cursor-pointer text-[14px]"
                                        >
                                            Tỉnh/Thành phố
                                        </button>
                                        <button
                                            ref={(ref) => (btnRef.current[1] = ref)}
                                            onClick={() => handleClickSideBarAddress("district")}
                                            disabled={!newaddress.province}
                                            className={`${
                                                !newaddress.province ? "cursor-not-allowed" : "cursor-pointer"
                                            } text-[14px]`}
                                        >
                                            Quận/Huyện
                                        </button>
                                        <button
                                            ref={(ref) => (btnRef.current[2] = ref)}
                                            onClick={() => handleClickSideBarAddress("ward")}
                                            disabled={!newaddress.province || !newaddress.district}
                                            className={`${
                                                !newaddress.province || !newaddress.district
                                                    ? "cursor-not-allowed"
                                                    : "cursor-pointer"
                                            } text-[14px]`}
                                        >
                                            Phường/Xã
                                        </button>
                                        <p
                                            className="absolute bottom-0 rounded-[5px] bg-red-500 py-[2px] transition-all duration-200 ease-linear"
                                            style={{ width, left }}
                                        ></p>
                                    </div>
                                    <div className="h-[300px] overflow-y-scroll">
                                        <ul>
                                            {!isHiddentAddress.province &&
                                                data?.map((val, index) => {
                                                    return (
                                                        <li
                                                            onClick={() =>
                                                                handleClickKeyMixed(index, val.name, "province")
                                                            }
                                                            className={`cursor-pointer px-2 py-2 text-[13px] text-gray-500 hover:bg-[#ece8e8] ${
                                                                newaddress.province === val.name
                                                                    ? "bg-[#e0dbdb]"
                                                                    : "bg-white"
                                                            }`}
                                                            key={index}
                                                        >
                                                            {val.name}
                                                        </li>
                                                    );
                                                })}
                                            {!isHiddentAddress.district && (
                                                <>
                                                    {data &&
                                                        data[foundAddress.province].districts.map((val, index) => {
                                                            return (
                                                                <li
                                                                    onClick={() =>
                                                                        handleClickKeyMixed(index, val.name, "district")
                                                                    }
                                                                    className={`cursor-pointer px-2 py-2 text-[13px] text-gray-500 hover:bg-[#ece8e8] ${
                                                                        newaddress.district === val.name
                                                                            ? "bg-[#e0dbdb]"
                                                                            : "bg-white"
                                                                    }`}
                                                                    key={index}
                                                                >
                                                                    {val.name}
                                                                </li>
                                                            );
                                                        })}
                                                </>
                                            )}
                                            {!isHiddentAddress.ward && (
                                                <>
                                                    {data &&
                                                        data[foundAddress.province].districts[
                                                            foundAddress.district
                                                        ].wards.map((val, index) => {
                                                            return (
                                                                <li
                                                                    onClick={() =>
                                                                        handleClickKeyMixed(index, val.name, "ward")
                                                                    }
                                                                    className={`cursor-pointer px-2 py-2 text-[13px] text-gray-500 hover:bg-[#ece8e8] ${
                                                                        newaddress.ward === val.name
                                                                            ? "bg-[#e0dbdb]"
                                                                            : "bg-white"
                                                                    }`}
                                                                    key={index}
                                                                >
                                                                    {val.name}
                                                                </li>
                                                            );
                                                        })}
                                                </>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            );
                        }}
                    >
                        <div
                            className="relative mb-5 flex"
                            onClick={() => {
                                setEdit(true);
                                setIsHiddentTippy(false);
                                setIsHiddentAddress({ ...isHiddentAddress, province: false });
                            }}
                        >
                            <input
                                className={`focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2  text-sm leading-tight text-gray-700 shadow focus:outline-none ${
                                    messageErrorAddress ? "border-red-500" : ""
                                }`}
                                type="text"
                                placeholder="Tỉnh/ Thành phố, Quận/Huyện, Phường/Xã"
                                defaultValue={`${newaddress.province}${
                                    newaddress.district ? ", " + newaddress.district : ""
                                }${newaddress.ward ? ", " + newaddress.ward : ""}`}
                                disabled={true}
                            />
                            <FiChevronDown className="absolute right-2 top-[50%] translate-y-[-65%] text-[20px] text-gray-500" />
                        </div>
                    </Tippy>
                </div>
                <InputForm
                    register={register}
                    name="address"
                    placeholder="Thôn xón, số nhà..."
                    title="Thôn xón, số nhà..."
                    rule={addressFormRule.address}
                    messageError={errors.address?.message}
                />
                <InputForm
                    register={register}
                    name="address2"
                    placeholder="Địa chỉ chi tiết"
                    title="Địa chỉ chi tiết"
                    rule={addressFormRule.address2}
                    messageError={errors.address2?.message}
                />
                <div className="flex items-center">
                    <input
                        onChange={() => setIsDefault(!isDefault)}
                        checked={isDefault}
                        type="checkbox"
                        id="isDefault"
                        className="mr-2 h-[15px] w-[15px]"
                    />
                    <label className="cursor-pointer text-[15px] text-gray-500" htmlFor="isDefault">
                        Đặt làm địa chỉ mặc định
                    </label>
                </div>
            </div>
            <div className="fixed bottom-0 left-0 flex  w-full justify-center border-t-[1px] border-[#ddd] py-3">
                <button
                    className=" mr-3 min-w-[90px] cursor-pointer  border-[1px] border-[#ddd] px-3 py-2 text-center text-gray-500"
                    onClick={() => setIsNewAddress(false)}
                >
                    Trở lại
                </button>
                <button
                    onClick={handleSubmitForm}
                    className="min-w-[90px] cursor-pointer border-transparent bg-blue-500 px-3 py-2 text-center text-white"
                >
                    Hoàn thành
                </button>
            </div>
        </>
    );
}

export default AddressForm;
