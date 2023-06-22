import toast, { Toaster } from "react-hot-toast";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
/*  */
import { getRules } from "../../utils/rules";
import InputForm from "../../components/InputForm";
import { authRegister } from "../../apis/auth.api";
import { errorResponse } from "../../utils/error";
import { AuthRegister } from "../../types/auth.type";
import { omit } from "lodash";
import Button from "../../components/Button";

function Register() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm<AuthRegister>();

    const { mutate, isLoading } = useMutation({
        mutationKey: ["register"],
        mutationFn: authRegister,
    });

    const rules = getRules(getValues);
    const onSubmit = handleSubmit((data) => {
        const body = omit(data, ["password_confirm"]);
        mutate(body, {
            onSuccess: () => {
                navigate("/login", {
                    state: "Đăng kí tài khoản thành công!",
                });
            },
            onError: (err) => {
                const message = errorResponse(err);
                if (message) {
                    toast.error(message);
                }
            },
        });
    });

    return (
        <div className="container mx-auto">
            <div className="flex justify-center px-6 my-12">
                <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                    <div
                        className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
                        style={{ backgroundImage: 'url("https://source.unsplash.com/K4mSJ7kc0As/600x800")' }}
                    />
                    <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
                        <h3 className="pt-4 text-2xl text-center">Welcome Back!</h3>
                        <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                            <InputForm
                                title="Email"
                                name="email"
                                placeholder="Email"
                                messageError={errors.email?.message}
                                register={register}
                                rule={rules.email}
                            />
                            <InputForm
                                title="Full name"
                                name="fullName"
                                placeholder="Full name"
                                messageError={errors.fullName?.message}
                                register={register}
                                rule={rules.fullName}
                            />
                            <InputForm
                                title="Password"
                                name="password"
                                placeholder="******************"
                                messageError={errors.password?.message}
                                register={register}
                                rule={rules.password}
                                type="password"
                            />
                            <InputForm
                                title="Password confirm"
                                name="password_confirm"
                                placeholder="******************"
                                messageError={errors.password_confirm?.message}
                                register={register}
                                rule={rules.password_confirm}
                                type="password"
                            />
                            <div className="mb-6 text-center">
                                <Button
                                    onClick={onSubmit}
                                    disabled={isLoading}
                                    isLoading={isLoading}
                                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline flex items-center justify-center "
                                    type="button"
                                >
                                    Đăng kí
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Toaster />
        </div>
    );
}

export default Register;
