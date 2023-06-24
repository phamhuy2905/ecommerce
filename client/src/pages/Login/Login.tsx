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
                                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline flex items-center justify-center"
                                >
                                    Đăng nhập
                                </Button>
                            </div>
                            <hr className="mb-6 border-t" />
                            <div className="text-center">
                                <Link
                                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                                    to="/register"
                                >
                                    Create an Account!
                                </Link>
                            </div>
                            <div className="text-center">
                                <a
                                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
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
