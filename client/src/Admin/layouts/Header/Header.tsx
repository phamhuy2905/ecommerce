import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css"; // optional
import { MdDarkMode } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { CiLogout, CiLight } from "react-icons/ci";
import { HiLanguage } from "react-icons/hi2";
import { FaBars } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { UseSideBarContext } from "../../context/sidebar.context";
import { useState } from "react";
import { UseDarkModeContext } from "../../context/darkMode.context";
export default function Header({ img }: { img: string }) {
    const { width, setWidth, setCollapse, collapse } = UseSideBarContext();
    const [defaultImg, setDefaultImg] = useState(img);
    const { toggleDarkMode, darkMode } = UseDarkModeContext();
    return (
        <header className=" flex w-[100%] items-center justify-between px-4 py-3  ">
            {width === "280px" ? (
                <></>
            ) : (
                <span
                    onClick={() => {
                        setWidth("280px");
                        setCollapse(false);
                    }}
                    className="cursor-pointer text-[20px] text-gray-500"
                >
                    <FaBars />
                </span>
            )}

            <div
                className={`${darkMode ? "dark" : "ligth"} flex w-full items-center rounded-[30px] px-4 py-2 ${
                    collapse ? "justify-end" : "justify-between"
                }`}
            >
                <div
                    className="relative flex w-[250px] items-center overflow-hidden rounded-[20px] "
                    style={{
                        boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,srgba(0, 0, 0s, 0.05) 0px 4px 6px -2px",
                    }}
                >
                    <input
                        className={`${
                            darkMode ? "dark_soft" : "bg-white"
                        } flex-1 py-2 pl-4 pr-10  text-black outline-none`}
                        type="text"
                        placeholder="Search..."
                    />
                    <button className="absolute right-2 top-[50%] translate-y-[-50%] text-[20px] text-gray-500 ">
                        <AiOutlineSearch />
                    </button>
                </div>
                <div className="flex items-center">
                    <span className="ml-3 mr-5 cursor-pointer text-[24px] text-gray-500">
                        <IoMdNotificationsOutline />
                    </span>
                    <span
                        onClick={() => toggleDarkMode()}
                        className="mr-5 cursor-pointer  select-none text-[24px] text-gray-500 "
                    >
                        {!darkMode ? <MdDarkMode /> : <CiLight />}
                    </span>
                    <Tippy
                        interactive
                        trigger="click"
                        content="Hello"
                        render={() => (
                            <div
                                className={`${
                                    darkMode ? "dark" : " bg-white"
                                } z-10 flex w-[200px]  flex-col pt-2 shadow-md`}
                            >
                                <div className="flex cursor-pointer items-center px-3 py-3 hover:shadow-md">
                                    <span className="mr-3 text-[22px] text-gray-500">
                                        <CgProfile />
                                    </span>
                                    <span>Profile</span>
                                </div>
                                <div className="flex cursor-pointer items-center px-3 py-3 hover:shadow-md">
                                    <span className="mr-3 text-[22px] text-gray-500">
                                        <HiLanguage />
                                    </span>
                                    <span>Languagge</span>
                                </div>
                                <div className="flex cursor-pointer items-center px-3 py-3 hover:shadow-md">
                                    <span className="mr-3 text-[22px] text-gray-500">
                                        <CiLogout />
                                    </span>
                                    <span>Logout</span>
                                </div>
                            </div>
                        )}
                    >
                        <div className="h-35px] mr-[10px] w-[35px] cursor-pointer select-none overflow-hidden rounded-full">
                            <img
                                onError={() => setDefaultImg("https://avatars.githubusercontent.com/u/107147020?v=4")}
                                className="h-[100%] w-[100%]"
                                src={defaultImg}
                                alt="Avatar"
                            />
                        </div>
                    </Tippy>
                </div>
            </div>
        </header>
    );
}
