import toast, { Toaster } from "react-hot-toast";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
/*  */
import { authLogin } from "../../apis/auth.api";
import InputForm from "../../components/InputForm";
import { AuthLogin } from "../../types/auth.type";
import { getRules } from "../../utils/rules";
import { errorResponse } from "../../utils/error";
import { useAuthContext } from "../../context/auth.context";
import Button from "../../components/Button";

function Login() {
    const { setIsAuthenticated, setProfile } = useAuthContext();
    const navigate = useNavigate();
    const location = useLocation();
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<AuthLogin>();

    const { mutate, isLoading } = useMutation({
        mutationKey: ["login"],
        mutationFn: authLogin,
    });
    const rules = getRules();
    const onSubmit = handleSubmit((data) => {
        mutate(data, {
            onSuccess: (res) => {
                setIsAuthenticated(true);
                setProfile(res.data.data.user);
                navigate("/");
            },
            onError: (err) => {
                const message = errorResponse(err);
                if (message) {
                    toast.error(message);
                }
            },
        });
    });

    useEffect(() => {
        if (location.state) {
            toast.success(location.state, { duration: 5000 });
            window.history.replaceState(null, "");
        }
    }, []);
    return (
        <div className="container mx-auto">
            <div className="my-12 flex justify-center px-6">
                <div className="flex w-full lg:w-11/12 xl:w-3/4">
                    <div
                        className="hidden h-auto w-full rounded-l-lg bg-gray-400 bg-cover lg:block lg:w-1/2"
                        style={{ backgroundImage: 'url("https://source.unsplash.com/K4mSJ7kc0As/600x800")' }}
                    />
                    <div className="w-full rounded-lg bg-white p-5 lg:w-1/2 lg:rounded-l-none">
                        <h3 className="pt-4 text-center text-2xl">Welcome Back!</h3>
                        <form className="mb-4 rounded bg-white px-8 pb-8 pt-6">
                            <InputForm
                                title="Email"
                                name="email"
                                placeholder="Email"
                                messageError={errors.email?.message}
                                register={register}
                                rule={rules.email}
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
                            <div className="mb-4">
                                <input className="mr-2 leading-tight" type="checkbox" id="checkbox_id" />
                                <label className="text-sm" htmlFor="checkbox_id">
                                    Remember Me
                                </label>
                            </div>
                            <div className="mb-6 text-center">
                                <Button
                                    onClick={onSubmit}
                                    disabled={isLoading}
                                    isLoading={isLoading}
                                    className="focus:shadow-outline flex w-full items-center justify-center rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                                >
                                    Đăng nhập
                                </Button>
                            </div>
                            <hr className="mb-6 border-t" />
                            <div className="text-center">
                                <Link
                                    className="inline-block align-baseline text-sm text-blue-500 hover:text-blue-800"
                                    to="/register"
                                >
                                    Create an Account!
                                </Link>
                            </div>
                            <div className="text-center">
                                <a
                                    className="inline-block align-baseline text-sm text-blue-500 hover:text-blue-800"
                                    href="#"
                                >
                                    Forgot Password?
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Toaster />
        </div>
    );
}

export default Login;
