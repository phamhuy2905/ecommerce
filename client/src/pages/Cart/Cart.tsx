import { useSelector } from "react-redux";
import ItemCart from "./components/ItemCart";
import { RootState } from "../../redux/store";
import { formatCoin } from "../../utils/format";
function Cart() {
    const { carts, total } = useSelector((state: RootState) => state.cart);
    return (
        <div className="py-10 bg-[#f5f5f5]">
            <div className="content">
                <h2 className="text-[30px] font-semibold mb-5">Giỏ hàng</h2>
                <div className="flex flex-col">
                    <div className="px-3 py-3 grid grid-cols-2 bg-white my-3">
                        <div className="flex items-center">
                            <input type="checkbox" />
                            <div className="mx-3">
                                <p className="ml-3 text-[15px] text-gray-500">Sản Phẩm</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="ml-3 text-[15px] text-gray-500">Đơn Giá</p>
                            <p className="ml-3 text-[15px] text-gray-500">Số Lượng</p>
                            <p className="ml-3 text-[15px] text-gray-500">Số Tiền</p>
                        </div>
                    </div>
                    {carts.map((val, index) => {
                        return (
                            <div key={index} className="px-3 py-3  bg-white my-3">
                                <h4 className="my-2 text-[16px]">
                                    Tên shop: <span className="ml-2 text-[16px] font-light">{val.shopName}</span>
                                </h4>
                                <div className="grid grid-cols-2">
                                    {val.itemProducts.map((item, _index) => {
                                        return (
                                            <ItemCart
                                                key={_index}
                                                cart={item}
                                                shopId={val.shopId}
                                                shopName={val.shopName}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <h3 className="text-[18px] text-gray-500 flex justify-between mt-3">
                    Tổng tiền:
                    <span className="text-[24px] ml-3">{formatCoin(total)}</span>
                </h3>
            </div>
        </div>
    );
}

export default Cart;
