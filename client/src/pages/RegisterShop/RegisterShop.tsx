import { useState, useEffect } from "react";
import InputForm from "../../components/InputForm";
import { useForm } from "react-hook-form";
import { registerShopRule } from "../../rules/profile.rule";
import { useMutation, useQuery } from "react-query";
import { authProfile, registerShop } from "../../apis/auth.api";
import { formDataV2 } from "../../helpers/formData.helper";
import { validateImg } from "../../helpers/validateImage";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { errorResponse } from "../../utils/error";
import { RegisterShopType, UserType } from "../../types/auth.type";
import { useAuthContext } from "../../context/auth.context";
import { saveProfileLocal } from "../../helpers/local.helper";
const defaultValues: RegisterShopType = {
    fullName: "",
    address: "",
    address2: "",
    phoneNumber: "",
    email: "",
};
function RegisterShop() {
    const [avatar, setAvatar] = useState<any>();
    const navigate = useNavigate();
    const { setProfile } = useAuthContext();
    const {
        formState: { errors },
        register,
        setValue,
        handleSubmit,
    } = useForm<RegisterShopType>({
        defaultValues,
    });
    const profile = useQuery({
        queryKey: ["profile"],
        queryFn: () => authProfile(),
        onSuccess: (res) => {
            const { fullName, address2, address, phoneNumber, email } = res.data;
            setValue("email", email);
            setValue("fullName", fullName);
            setValue("address", address ? address : "");
            setValue("address2", address2 ? address2 : "");
            setValue("phoneNumber", phoneNumber ? phoneNumber : "");
        },
    });
    const { mutate } = useMutation({
        mutationKey: ["updateProfile"],
        mutationFn: (data: any) => registerShop(data),
    });

    const handleRegisterShop = handleSubmit((form) => {
        const fd = new FormData();
        const dataForm = formDataV2(fd, { ...form, avatar });
        dataForm.delete("email");
        mutate(dataForm, {
            onSuccess: (res) => {
                const { _id, avatar, email, fullName } = res.data;
                const newProfile: UserType = { _id, email, fullName, avatar, role: "0002" };
                setProfile(newProfile);
                saveProfileLocal(newProfile);
                navigate("/", {
                    state: "Đăng kí người bán thành công thành công!",
                });
            },
            onError: (err) => {
                const error = errorResponse(err);
                toast.error(error || "Something wronggg!!");
            },
        });
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const check = validateImg(e);
        if (!check) {
            toast.error("File chỉ được dạng gif, png, jpg, jpe");
            return;
        }
        setAvatar(e.target.files!["0"]);
    };
    useEffect(() => {
        return () => {
            URL.revokeObjectURL(avatar);
        };
    }, [avatar]);
    return (
        <div className="content py-5">
            <h2 className="my-3 text-[20px] font-semibold text-black">Account Detail</h2>
            <div className="grid grid-cols-1 gap-y-10">
                <div className="flex items-center">
                    <div className="h-[100px] w-[100px] overflow-hidden rounded-[10px] ">
                        <img
                            className="h-full w-full object-cover"
                            src={`${
                                avatar
                                    ? URL.createObjectURL(avatar)
                                    : profile.data?.data.avatar ||
                                      "https://avatars.githubusercontent.com/u/107147020?v=4"
                            }
                                `}
                            alt="Avatar"
                        />
                    </div>
                    <div className="ml-5 flex">
                        <label
                            className="cursor-pointer rounded-[10px] bg-blue-500 px-5 py-2 text-[15px] text-white"
                            htmlFor="avatar"
                        >
                            Upload new avatar
                        </label>
                        <input id="avatar" name="avatar" hidden type="file" onChange={handleChange} />
                    </div>
                </div>
                <InputForm
                    name="email"
                    register={register}
                    placeholder="Vui lòng nhập tên của bạn"
                    messageError={errors.email?.message}
                    title="Họ và tên"
                    rule={registerShopRule.email}
                    disabled={true}
                />
                <InputForm
                    name="fullName"
                    register={register}
                    placeholder="Vui lòng nhập tên shop"
                    messageError={errors.fullName?.message}
                    title="Tên shop"
                    rule={registerShopRule.fullName}
                />
                <InputForm
                    name="phoneNumber"
                    register={register}
                    placeholder="Vui lòng nhập số điện thoại của bạn"
                    messageError={errors.phoneNumber?.message}
                    title="Số điện thoại"
                    rule={registerShopRule.phoneNumber}
                />
                <InputForm
                    name="address"
                    register={register}
                    placeholder="Vui lòng nhập địa chỉ của shop"
                    messageError={errors.address?.message}
                    title="Địa chỉ shop"
                    rule={registerShopRule.address}
                />
                <InputForm
                    name="address2"
                    register={register}
                    placeholder="Vui lòng nhập địa chỉ chi tiết của bạn"
                    messageError={errors.address2?.message}
                    title="Địa chỉ chi tiết(không bắt buộc)"
                    rule={registerShopRule.address2}
                />
            </div>
            <button
                type="button"
                className="my-10 rounded-[10px] bg-blue-400 px-7 py-3 text-white"
                onClick={handleRegisterShop}
            >
                Đăng kí trở thành người bán
            </button>
        </div>
    );
}

export default RegisterShop;
