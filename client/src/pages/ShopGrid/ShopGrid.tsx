import { BiChevronRight } from "react-icons/bi";
import Title from "../../components/Tittle";
import SideBar from "./layouts/SideBar";
import FeaturedShop from "./layouts/Featured";
function ShopGrid() {
    return (
        <div className="py-4">
            <div className="content">
                <Title header="Shop Grid" label="Welcom" />
                <div className="my-4 flex items-center text-[14px] text-gray-500">
                    <p>Home</p>
                    <BiChevronRight className="mx-2" />
                    <p>Shop Grid</p>
                </div>
                <div className="grid grid-cols-12">
                    <div className="relative col-span-3 col-start-1 overflow-hidden">
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
