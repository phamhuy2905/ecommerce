import { BsList } from "react-icons/bs";
import { FiChevronDown, FiPhoneCall } from "react-icons/fi";
function Navbar() {
    return (
        <div className="lg:hidden hidden xl:block ">
            <div className="xl:max-w-7xl  mx-auto px-4">
                <div className="flex justify-between items-center">
                    <ul className="flex items-center">
                        <li className="px-4 py-3 bg-blue-600 text-white mr-3 flex items-center cursor-pointer">
                            <BsList className="text-[20px]" />
                            <p className="text-[14px] ml-1 mr-10">All Departments</p>
                            <FiChevronDown className="text-[17px]" />
                        </li>
                        <li className="px-6  py-3  text-gray-600 mr-3 flex items-cente cursor-pointer">
                            <p className="text-[14px] mr-1">Home</p>
                            <FiChevronDown className="text-[17px]" />
                        </li>
                        <li className="px-6  py-3  text-gray-600 mr-3 flex items-center cursor-pointer">
                            <p className="text-[14px] mr-1">Product</p>
                            <FiChevronDown className="text-[17px]" />
                        </li>
                        <li className="px-6  py-3  text-gray-600 mr-3 flex items-center cursor-pointer">
                            <p className="text-[14px] mr-1">Shop</p>
                            <FiChevronDown className="text-[17px]" />
                        </li>
                    </ul>
                    <div className="flex items-center">
                        <FiPhoneCall className="text-[20px] text-blue-600 mr-3" />
                        <p className="text-black text-[15px]">
                            <span className="text-[14px] text-gray-500 ">Hotline: </span>
                            +(402) 763 282 46
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
