import { useQuery } from "react-query";
import HeaderTableProduct from "../ProductAdmin/components/HeaderTableProduct";
import { getAllOrderPending } from "../../apis/order.api";
import ItemOrder from "./components/ItemOrder";
import Skeleton from "react-loading-skeleton";
import Paginate from "../../components/Paginate";
const tHead = ["Cutstomer", "Phone number", "Recipient", "Status", "Total", "Detail"];
function OrderAdminPending() {
    const { data } = useQuery({
        queryKey: ["OrderAdminPending"],
        queryFn: getAllOrderPending,
    });
    return (
        <div className="flex flex-col bg-white">
            <div className=" mt-7 px-5 py-5 shadow-md">
                <h4 className="text-[20px] font-semibold">All Order </h4>
            </div>
            <section className="bg-blueGray-50 relative pt-5">
                <div className="mb-12 w-full px-4">
                    <div
                        className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded bg-gray-900 
                            text-white shadow-lg"
                    >
                        <div className="mb-0 rounded-t border-0 px-4 py-3">
                            <div className="flex flex-wrap items-center">
                                <div className="relative flex w-full max-w-full flex-1 flex-grow items-center justify-between px-4">
                                    <h3 className="text-lg font-semibold text-white">Card Tables</h3>
                                    <select name="" id="" className="text-black">
                                        <option value="">All</option>
                                        <option value="SUCCESS">Success</option>
                                        <option value="PENDING">Pending</option>
                                        <option value="SHIPPING">Shipping</option>
                                        <option value="CANCELED">Canceled</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="block w-full overflow-x-auto ">
                            <table
                                className="w-full border-separate items-center bg-transparent "
                                style={{ borderSpacing: "0 10px" }}
                            >
                                <HeaderTableProduct data={tHead} />
                                <tbody>
                                    {data?.orders?.map((val, index) => {
                                        return (
                                            <ItemOrder
                                                key={index}
                                                userOrder={val.userId}
                                                total={val.orderCheckOut.totalBalance}
                                                orderShipping={val.orderShipping}
                                                idOrder={val._id}
                                            />
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        {data?.orders.length ? (
                            <Paginate pages={data.page} currentPage={1} />
                        ) : (
                            <Skeleton baseColor="#1f2937" count={50} />
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default OrderAdminPending;
