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
import { useRef, useState, useLayoutEffect } from "react";
import { useQuery } from "react-query";
import { getDataVietNam } from "../../apis/service.api";
const defaultValues = {
    fullName: "",
    phoneNumber: "",
    address2: "",
};
function AddressForm() {
    const {
        register,
        formState: { errors },
    } = useForm<AddressFormType>({ defaultValues });
    const btnRef = useRef<HTMLButtonElement[] | null[]>([]);
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
        queryKey: ["address"],
        queryFn: getDataVietNam,
        staleTime: Infinity,
        enabled: edit,
    });
    const handleClickKeyMixed = (index: number, value: string, key: "province" | "district" | "ward") => {
        if (key === "province") {
            setFoundAddress({ district: 0, ward: 0, [key]: index });
            setNewAddress({ district: "", ward: "", [key]: value });
            setIsHiddentAddress({ district: false, ward: true, [key]: true });
        } else if (key === "district") {
            setFoundAddress({ ...foundAddress, ward: 0, [key]: index });
            setNewAddress({ ...newaddress, ward: "", [key]: value });
            setIsHiddentAddress({ province: true, ward: false, [key]: true });
        } else if (key === "ward") {
            setFoundAddress({ ...foundAddress, [key]: index });
            setNewAddress({ ...newaddress, [key]: value });
            setIsHiddentTippy(true);
            setIsHiddentAddress({ province: true, district: true, [key]: true });
        }
    };
    const handleShowTippy = () => {
        console.log(width);
        const { district, province, ward } = newaddress;
        if (province && district && ward) {
            setIsHiddentAddress({ district: true, ward: true, province: false });
        }
    };
    const handleClickSideBarAddress = (key: "province" | "district" | "ward") => {
        if (key === "province") {
            setIsHiddentAddress({ district: true, ward: true, [key]: false });
        } else if (key === "district") {
            setIsHiddentAddress({ province: true, ward: true, [key]: false });
        } else if (key === "ward") {
            setIsHiddentAddress({ province: true, district: true, [key]: false });
        }
    };

    useLayoutEffect(() => {
        setWidth(btnRef.current[0]?.offsetWidth!);
    }, []);

    return (
        <div className="px-2 py-2">
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
                                <div className="grid grid-cols-3 justify-between border-b-[1px] border-[#ddd] px-2 py-2">
                                    <button
                                        ref={(ref) => (btnRef.current[0] = ref)}
                                        onClick={() => handleClickSideBarAddress("province")}
                                        className="cursor-pointer text-[14px] "
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
                                </div>
                                <div className="h-[300px] overflow-y-scroll">
                                    <ul>
                                        {(!newaddress.province || !isHiddentAddress.province) &&
                                            data?.map((val, index) => {
                                                return (
                                                    <li
                                                        onClick={() => handleClickKeyMixed(index, val.name, "province")}
                                                        className={`cursor-pointer px-2 py-2 text-[13px] text-gray-500 hover:bg-[#f5f5f5] ${
                                                            newaddress.province === val.name
                                                                ? "bg-[#f5f5f5]"
                                                                : "bg-white"
                                                        }`}
                                                        key={index}
                                                    >
                                                        {val.name}
                                                    </li>
                                                );
                                            })}
                                        {((!newaddress.ward && !newaddress.district && newaddress.province) ||
                                            !isHiddentAddress.district) && (
                                            <>
                                                {data &&
                                                    data[foundAddress.province].districts.map((val, index) => {
                                                        return (
                                                            <li
                                                                onClick={() =>
                                                                    handleClickKeyMixed(index, val.name, "district")
                                                                }
                                                                className={`cursor-pointer px-2 py-2 text-[13px] text-gray-500 hover:bg-[#f5f5f5] ${
                                                                    newaddress.district === val.name
                                                                        ? "bg-[#f5f5f5]"
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
                                        {((newaddress.district && newaddress.province && !newaddress.ward) ||
                                            !isHiddentAddress.ward) && (
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
                                                                className={`cursor-pointer px-2 py-2 text-[13px] text-gray-500 hover:bg-[#f5f5f5] ${
                                                                    newaddress.ward === val.name
                                                                        ? "bg-[#f5f5f5]"
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
                        }}
                    >
                        <input
                            className="flex-1 cursor-pointer border-[1px] border-[#ddd] px-2 py-2 text-[14px] text-gray-500 outline-none"
                            type="text"
                            placeholder="Tỉnh/ Thành phố, Quận/Huyện, Phường/Xã"
                            defaultValue={`${newaddress.province}${
                                newaddress.district ? ", " + newaddress.district : ""
                            }${newaddress.ward ? ", " + newaddress.ward : ""}`}
                            disabled={true}
                        />
                        <FiChevronDown className="absolute right-2 top-[50%] translate-y-[-50%] text-[20px] text-gray-500" />
                    </div>
                </Tippy>
            </div>
            <InputForm
                register={register}
                name="address2"
                placeholder="Địa chỉ chi tiết"
                title="Địa chỉ chi tiết"
                rule={addressFormRule.address2}
                messageError={errors.address2?.message}
            />
        </div>
    );
}

export default AddressForm;
