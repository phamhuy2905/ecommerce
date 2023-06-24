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
                        <div className=" shadow-xl z-10 bg-white rounded-[10px] min-w-[170px] overflow-hidden">
                            <ul>
                                {profile?.fullName && (
                                    <li className="text-[14px] text-gray-500  cursor-pointer hover:bg-slate-200">
                                        <span className="hover:bg-slate-200 py-2 px-3   block">
                                            {" "}
                                            {profile?.fullName}{" "}
                                        </span>
                                    </li>
                                )}
                                {!isAuthenticated && (
                                    <li className="text-[14px] text-gray-500 cursor-pointer ">
                                        <a className="hover:bg-slate-200 py-2 px-3  block" href={path.client.login}>
                                            Đăng nhập
                                        </a>
                                    </li>
                                )}
                                {!isAuthenticated && (
                                    <li className="text-[14px] text-gray-500 cursor-pointer hover:bg-slate-200">
                                        <a className="hover:bg-slate-200 py-2 px-3  block" href={path.client.register}>
                                            Đăng kí
                                        </a>
                                    </li>
                                )}

                                {isAuthenticated && (
                                    <li
                                        onClick={handleLogout}
                                        className="text-[14px] text-gray-500 cursor-pointer hover:bg-slate-200"
                                    >
                                        <span className="hover:bg-slate-200 py-2 px-3  block"> Đăng xuất</span>
                                    </li>
                                )}
                                <li className="text-[14px] text-gray-500  cursor-pointer hover:bg-slate-200">
                                    <span className="hover:bg-slate-200 py-2 px-3   block"> Language</span>
                                </li>
                            </ul>
                        </div>
                    }
                >
                    <div className="w-[35px] h-[35px] overflow-hidden rounded-full border-[1px] border-gray-400 cursor-pointer">
                        <img
                            className="w-full h-full object-cover"
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
