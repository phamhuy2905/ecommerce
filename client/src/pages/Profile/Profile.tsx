import { useState, useEffect } from "react";
import InputForm from "../../components/InputForm";
import { useForm } from "react-hook-form";
import { profileRule } from "../../rules/profile.rule";
import { useMutation, useQuery } from "react-query";
import { authProfile, updateProfile } from "../../apis/auth.api";
import { formDataV2 } from "../../helpers/formData.helper";
import { validateImg } from "../../helpers/validateImage";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { errorResponse } from "../../utils/error";
import { UpdateProfileType } from "../../types/auth.type";
import { useAuthContext } from "../../context/auth.context";
import { saveProfileLocal } from "../../helpers/local.helper";
const defaultValues: UpdateProfileType = {
    fullName: "",
    email: "",
};
function Profile() {
    const [avatar, setAvatar] = useState<any>();
    const navigate = useNavigate();
    const { setProfile, profile: profileAuth } = useAuthContext();
    const {
        formState: { errors },
        register,
        setValue,
        handleSubmit,
    } = useForm<UpdateProfileType>({
        defaultValues,
    });
    const profile = useQuery({
        queryKey: ["profile"],
        queryFn: () => authProfile(),
        onSuccess: (res) => {
            const { fullName, email } = res.data;
            setValue("email", email);
            setValue("fullName", fullName);
        },
    });
    const { mutate } = useMutation({
        mutationKey: ["updateProfile"],
        mutationFn: (data: any) => updateProfile(data),
    });

    const handleUpdateProfile = handleSubmit((form) => {
        const fd = new FormData();
        const dataForm = formDataV2(fd, { ...form, avatar });
        dataForm.delete("email");
        mutate(dataForm, {
            onSuccess: (res) => {
                const { _id, avatar, email, fullName, role } = res.data;
                const newProfile = { _id, email, fullName, avatar, role };
                setProfile(newProfile);
                saveProfileLocal(newProfile);
                navigate("/", {
                    state: "Cập nhật thông tin thành công!",
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
                    rule={profileRule.email}
                    disabled={true}
                />
                <InputForm
                    name="fullName"
                    register={register}
                    placeholder="Vui lòng nhập tên của bạn"
                    messageError={errors.fullName?.message}
                    title="Họ và tên"
                    rule={profileRule.fullName}
                />
            </div>
            <button
                type="button"
                className="my-10 rounded-[10px] bg-blue-400 px-7 py-3 text-white"
                onClick={handleUpdateProfile}
            >
                Save change
            </button>
        </div>
    );
}

export default Profile;
