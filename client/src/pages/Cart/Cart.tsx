import { useSelector } from "react-redux";
import ItemCart from "./components/ItemCart";
import { RootState } from "../../redux/store";
import { formatCoin } from "../../utils/format";
import HeaderItemCart from "./components/HeaderItemCart";
import { Link } from "react-router-dom";
import { omit } from "lodash";
import { useMemo } from "react";

function Cart() {
    const { carts, metaTotal } = useSelector((state: RootState) => state.cart);
    const data = useMemo(() => {
        const shopOrders = carts
            .map((item) => {
                const itemProducts = item.itemProducts.filter((val) => val.isChecked);
                if (itemProducts.length)
                    return {
                        shopId: item.shopId,
                        itemProducts: itemProducts.map((val) =>
                            omit({ productId: val.id, price: val.price, quantity: val.quantity })
                        ),
                    };
            })
            .filter((val) => val);
        return shopOrders.length ? { useId: "123asd", shopOrders } : null;
    }, [carts]);
    return (
        <div className="bg-[#f5f5f5] py-10">
            <div className="content">
                <h2 className="mb-5 text-[30px] font-semibold">Giỏ hàng</h2>
                <div className="flex flex-col">
                    <HeaderItemCart />
                    {carts.map((val, index) => {
                        return (
                            <div key={index} className="my-3 bg-white px-3 py-3">
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
                <h3 className="mt-3 flex justify-between text-[18px] text-gray-500">
                    Tổng tiền:
                    <span className="ml-3 text-[24px]">{formatCoin(metaTotal)}</span>
                </h3>
                <div className="mt-6 flex justify-end">
                    {data ? (
                        <Link
                            to={{
                                pathname: `/checkout/${encodeURIComponent(btoa(JSON.stringify(data)))}`,
                            }}
                            className="rounded-[7px] bg-blue-500 px-5 py-2 text-right text-[15px] text-white"
                        >
                            Thanh toán
                        </Link>
                    ) : (
                        <button className="rounded-[7px] bg-red-500 px-5 py-2 text-right text-[15px] text-white">
                            Chưa có sản phẩm nào được chọn
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Cart;
