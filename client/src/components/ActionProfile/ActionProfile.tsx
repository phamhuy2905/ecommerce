import toast, { Toaster } from "react-hot-toast";
import Tippy from "@tippyjs/react";
import { useAuthContext } from "../../context/auth.context";
import { path } from "../../helpers/path.helper";
import { useMutation } from "react-query";
import { authLogout } from "../../apis/auth.api";
import { useNavigate } from "react-router-dom";
import { errorResponse } from "../../utils/error";
function ActionProfile() {
    const { isAuthenticated, profile, setIsAuthenticated, setProfile } = useAuthContext();
    const navigate = useNavigate();
    const { mutate } = useMutation({
        mutationKey: ["logout"],
        mutationFn: authLogout,
        onSuccess: () => {
            setIsAuthenticated(false);
            setProfile(null);
            navigate("/login");
        },
        onError: (err) => {
            const message = errorResponse(err);
            if (message) {
                toast.error(message);
            }
        },
    });

    const handleLogout = () => {
        mutate();
    };
    return (
        <>
            <div>
                <Tippy
                    animation="perspective"
                    interactive
                    trigger="click"
                    content={
                        <div className=" z-10 min-w-[170px] overflow-hidden rounded-[10px] bg-white shadow-xl">
                            <ul>
                                {profile?.fullName && (
                                    <li className="cursor-pointer text-[14px]  text-gray-500 hover:bg-slate-200">
                                        <span className="block px-3 py-2   hover:bg-slate-200">
                                            {" "}
                                            {profile?.fullName}{" "}
                                        </span>
                                    </li>
                                )}
                                {!isAuthenticated && (
                                    <li className="cursor-pointer text-[14px] text-gray-500 ">
                                        <a className="block px-3 py-2  hover:bg-slate-200" href={path.client.login}>
                                            Đăng nhập
                                        </a>
                                    </li>
                                )}
                                {!isAuthenticated && (
                                    <li className="cursor-pointer text-[14px] text-gray-500 hover:bg-slate-200">
                                        <a className="block px-3 py-2  hover:bg-slate-200" href={path.client.register}>
                                            Đăng kí
                                        </a>
                                    </li>
                                )}

                                {isAuthenticated && (
                                    <li
                                        onClick={handleLogout}
                                        className="cursor-pointer text-[14px] text-gray-500 hover:bg-slate-200"
                                    >
                                        <span className="block px-3 py-2  hover:bg-slate-200"> Đăng xuất</span>
                                    </li>
                                )}
                                <li className="cursor-pointer text-[14px]  text-gray-500 hover:bg-slate-200">
                                    <span className="block px-3 py-2   hover:bg-slate-200"> Language</span>
                                </li>
                            </ul>
                        </div>
                    }
                >
                    <div className="h-[35px] w-[35px] cursor-pointer overflow-hidden rounded-full border-[1px] border-gray-400">
                        <img
                            className="h-full w-full object-cover"
                            src={profile?.avatar || "https://avatars.githubusercontent.com/u/107147020?v=4"}
                            alt="Avatar"
                        />
                    </div>
                </Tippy>
            </div>
            <Toaster />
        </>
    );
}

export default ActionProfile;
