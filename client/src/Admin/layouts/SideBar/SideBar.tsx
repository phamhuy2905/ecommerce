import { Link, LinkProps, NavLink } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import { AiOutlineHome, AiOutlineShoppingCart, AiOutlineSetting } from "react-icons/ai";
import { RxDot } from "react-icons/rx";
import { BsChevronDown } from "react-icons/bs";
import { HiOutlineDatabase } from "react-icons/hi";
import { FaBars } from "react-icons/fa";
import { UseSideBarContext } from "../../context/sidebar.context";
import { useLocation } from "react-router-dom";
import { UseDarkModeContext } from "../../context/darkMode.context";
import { path } from "../../../helpers/path.helper";

interface ChildrenFakeType {
    id: number;
    path: string;
    title: string;
}
interface FakeType {
    id: number;
    title: string;
    icon: JSX.Element;
    path: string;
    children?: ChildrenFakeType[];
}

const fake: FakeType[] = [
    {
        id: 1,
        title: "Home",
        icon: <AiOutlineHome />,
        path: path.server.home,
    },

    {
        id: 2,
        title: "Products",
        icon: <HiOutlineDatabase />,
        path: path.server.product.all,
        children: [
            {
                id: 1,
                title: "All Product",
                path: path.server.product.all,
            },
            {
                id: 2,
                title: "Add Product",
                path: path.server.product.add,
            },
        ],
    },
    {
        id: 3,
        title: "Orders",
        icon: <AiOutlineShoppingCart />,
        path: path.server.order.all,
        children: [
            {
                id: 1,
                title: "All Order",
                path: path.server.order.all,
            },
            {
                id: 2,
                title: "Order Pending",
                path: path.server.order.pending,
            },
        ],
    },
    {
        id: 4,
        title: "Quay lại trang chủ",
        icon: <AiOutlineSetting />,
        path: "/",
    },
];

function SideBar() {
    const { darkMode } = UseDarkModeContext();
    const location = useLocation();
    let pathAction = location.pathname.split("/")[location.pathname.split("/").length - 1];
    if (pathAction.split("-").length >= 2) {
        pathAction = pathAction.split("-")[1];
    }
    const { width, setWidth, setCollapse } = UseSideBarContext();
    const [arr, setArr] = useState<number[]>([]);
    const handelCheck = (id: number, children: ChildrenFakeType[] | undefined) => {
        if (children) {
            const data = arr.includes(id) ? arr.filter((val) => val !== id) : [...arr, id];

            setArr(data);
        }
    };
    return (
        <StyledSideBar
            className={`${
                darkMode ? "dark_soft" : "bg-white"
            } fixed top-3  h-[100%] overflow-x-hidden rounded-[12px]  transition-all`}
            style={{
                width: width,
            }}
        >
            <div className={`overflow-auto overflow-x-hidden `}>
                <div className="flex items-center  justify-between px-3 py-4 ">
                    <span className="text-[18px] font-semibold text-gray-500">Hello Admin</span>
                    <span
                        onClick={() => {
                            setWidth("0");
                            setCollapse(true);
                        }}
                        className="cursor-pointer text-[20px] text-gray-500"
                    >
                        <FaBars />
                    </span>
                </div>
                <div
                    className=" mx-auto flex items-center justify-center overflow-hidden py-1"
                    style={{
                        borderBottom: darkMode ? "2px solid #353434" : "4px solid #f4f7ff",
                    }}
                >
                    <img
                        src="https://avatars.githubusercontent.com/u/107147020?v=4"
                        className="my-2 h-[70px] w-[70px] rounded-full"
                        alt=""
                    />
                </div>
                <div className="mt-5 flex  h-[100%]  flex-col">
                    <ul className="whitespace-nowrap">
                        {fake.map((val) => {
                            let Comp:
                                | string
                                | React.ForwardRefExoticComponent<LinkProps & React.RefAttributes<HTMLAnchorElement>> =
                                "div";
                            if (val.path && !val.children) {
                                Comp = Link;
                            }
                            return (
                                <li
                                    onClick={() => handelCheck(val.id, val.children)}
                                    className={`${
                                        val.path.includes(pathAction)
                                            ? `${!darkMode ? "bg-[#ebf0fe] text-[#6b88e7]" : "bg-[#353434] shadow-sm"}`
                                            : `${darkMode ? "dark_soft" : "bg-white text-[#bbc4dd]"}`
                                    } mx-3 my-2 cursor-pointer rounded-[5px] ${
                                        darkMode ? "hover:bg-[#353434] " : "hover:bg-[#ebf0fe]"
                                    }  ${darkMode ? "hover:text-white" : "hover:text-[#6b88e7]"}  transition-all `}
                                    key={val.id}
                                >
                                    <Comp to={val.path || "/admin"} className="block py-3 ">
                                        <div className="ml-2 flex items-center justify-between ">
                                            <p className={`flex items-center `}>
                                                <span className="mr-3 text-[22px] ">{val?.icon}</span>
                                                <span>{val?.title}</span>
                                            </p>
                                            {val.children && (
                                                <span className="mr-4 ">
                                                    <BsChevronDown />
                                                </span>
                                            )}
                                        </div>
                                        {val.children ? (
                                            <ul
                                                className={` border-after not_animation pl-7 text-[15px] ${
                                                    arr.includes(val.id) ? "animation" : ""
                                                }`}
                                            >
                                                {val.children.map((item) => {
                                                    return (
                                                        <li className="mt-3  " key={item.id}>
                                                            <NavLink
                                                                end={true}
                                                                to={item.path}
                                                                className={(props) =>
                                                                    props.isActive
                                                                        ? "flex items-center bg-blue-200"
                                                                        : "flex items-center "
                                                                }
                                                            >
                                                                <RxDot className="mr-2 text-[25px]" />
                                                                <p className="">{item.title}</p>
                                                            </NavLink>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        ) : (
                                            <></>
                                        )}
                                    </Comp>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </StyledSideBar>
    );
}

const StyledSideBar = styled.div`
    .not_animation {
        transition: max-height 0.3s ease-out;
        overflow-y: hidden;
        max-height: 0px;
    }
    .animation {
        transition: max-height 0.3s ease-in;
        overflow-y: hidden;
        max-height: 120px;
    }
    .border-after {
        position: relative;
        &::after {
            position: absolute;
            content: "";
            top: 17px;
            left: 13px;
            width: 3px;
            height: 80%;
            background-color: #d4e7f3;
            border-radius: 15px;
        }
    }
`;

export default SideBar;
