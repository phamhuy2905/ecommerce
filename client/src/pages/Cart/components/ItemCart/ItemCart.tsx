import Tippy from "@tippyjs/react/headless";
import { FiChevronDown } from "react-icons/fi";
import { formatCoin } from "../../../../utils/format";
import ChangeQuantity from "../../../../components/ChangeQuantity";
import { CartProductType } from "../../../../types/slice/cart.type";
import { useAppDispatch } from "../../../../redux/store";
import { changeQuantity, checkedCart } from "../../../../redux/cart.slice";

function ItemCart({ cart, shopName, shopId }: { cart: CartProductType; shopName: string; shopId: string }) {
    const dispatch = useAppDispatch();
    const data = {
        id: cart.id,
        color: cart.color,
        size: cart.size,
        shopId,
    };
    const toggle = () => {
        dispatch(checkedCart(data));
    };

    const onQuantity = (type: "incr" | "decr") => {
        dispatch(changeQuantity({ ...data, type }));
    };

    return (
        <>
            <div className="my-2 flex items-center">
                <input type="checkbox" defaultChecked={false} onChange={toggle} />
                <div className="mx-3">
                    <img className="h-[80px] w-[80px] object-cover" src={cart.thumbnail} alt="Product" />
                </div>
                <p className="ml-3 w-[160px] truncate text-[15px]  text-gray-500">{cart.name}</p>
                <Tippy
                    trigger="click"
                    render={() => {
                        return (
                            <div
                                className="min-w-[300px] rounded-[7px] bg-white px-3 py-3"
                                style={{
                                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                                }}
                            >
                                <p className="mt-2 flex items-center">
                                    <span className="mr-2">Tên shop:</span>
                                    <span>{shopName}</span>
                                </p>
                                <p className="mt-2 flex items-center">
                                    <span className="mr-2">Size:</span>
                                    <span>{cart.size}</span>
                                </p>
                                <p className="mt-2 flex items-center">
                                    <span className="mr-2">Color:</span>
                                    <span>{cart.color}</span>
                                </p>
                            </div>
                        );
                    }}
                >
                    <div className="ml-7 flex cursor-pointer select-none items-center font-semibold ">
                        <p className="text-[15px] ">Phân loại </p>
                        <FiChevronDown className="ml-1" />
                    </div>
                </Tippy>
            </div>
            <div className="flex items-center justify-between">
                <p className="ml-3 text-[15px] text-gray-500">{formatCoin(cart.price)}</p>
                <ChangeQuantity onQuantity={onQuantity} quantity={cart.quantity} />
                <p className="ml-3 text-[15px] text-gray-500">{formatCoin(cart.price * cart.quantity)}</p>
            </div>
        </>
    );
}

export default ItemCart;
