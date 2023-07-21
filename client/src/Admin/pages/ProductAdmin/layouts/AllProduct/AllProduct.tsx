import { useEffect } from "react";
import ItemProduct from "../../components/ItemProduct";
import HeaderTableProduct from "../../components/HeaderTableProduct";
import { UseDarkModeContext } from "../../../../context/darkMode.context";
import Paginate from "../../../../components/Paginate";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../../../redux/store";
import { getProductAdmin } from "../../../../../redux/actions/productAdmin.slice";
import { searchParams } from "../../../../../utils/query";
const tHead = ["Name", "Price", "InStock", "Edit", "Delete", "Detail"];
function AllProduct() {
    const { darkMode } = UseDarkModeContext();
    const { products, page } = useSelector((state: RootState) => state.productAdmin);
    const query: any = searchParams() || {};

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getProductAdmin(query?.page || 1));
    }, []);

    return (
        <div
            className={`${darkMode ? "dark_soft" : "bg-white"} flex flex-col `}
            style={{
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
            }}
        >
            <section className="bg-blueGray-50 relative pt-5">
                <div className="mb-5 w-full px-4">
                    <div
                        className={`${
                            darkMode ? "dark_soft" : "bg-gray-900"
                        } relative mb-6 flex w-full min-w-0 flex-col break-words rounded text-white 
                        shadow-lg`}
                    >
                        <div className="mb-0 rounded-t border-0 px-4 py-3">
                            <div className="flex flex-wrap items-center">
                                <div className="relative flex w-full max-w-full flex-1 flex-grow items-center justify-between px-4">
                                    <h3 className="text-lg font-semibold text-white">Card Tables</h3>
                                    <a
                                        href="add-product"
                                        className=" rounded-md bg-green-500 px-3 py-1 text-[14px] text-white"
                                    >
                                        Add Product
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="block w-full overflow-x-auto ">
                            <table
                                className="w-full border-separate items-center bg-transparent "
                                style={{ borderSpacing: "0 10px" }}
                            >
                                <HeaderTableProduct data={tHead} />
                                {products.map((val, index) => {
                                    return (
                                        <tbody key={index}>
                                            <ItemProduct product={val} />
                                        </tbody>
                                    );
                                })}
                            </table>

                            {products.length ? (
                                <Paginate pages={page} currentPage={query.page || 1} />
                            ) : (
                                <Skeleton baseColor="#1f2937" count={20} />
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default AllProduct;
