import { BiChevronRight } from "react-icons/bi";
import Title from "../../components/Tittle";
import classNames from "classnames/bind";
import styles from "./ShopGrid.module.scss";
import SideBar from "./layouts/SideBar";
import FeaturedShop from "./layouts/Featured";
const cx = classNames.bind(styles);
function ShopGrid() {
    return (
        <div className="py-4">
            <div className="content">
                <Title header="Shop Grid" label="Welcom" />
                <div className="flex items-center text-[14px] text-gray-500 my-4">
                    <p>Home</p>
                    <BiChevronRight className="mx-2" />
                    <p>Shop Grid</p>
                </div>
                <div className="grid grid-cols-12">
                    <div className="col-start-1 col-span-3">
                        <SideBar />
                    </div>
                    <div className="col-span-9">
                        <FeaturedShop />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShopGrid;
