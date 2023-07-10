import { useSelector } from "react-redux";
import { checkedAllCart } from "../../../../redux/cart.slice";
import { RootState, useAppDispatch } from "../../../../redux/store";
import { useEffect, useState } from "react";
function HeaderItemCart({ checkbox = true }: { checkbox?: boolean }) {
    const dipatch = useAppDispatch();
    const { carts } = useSelector((state: RootState) => state.cart);
    const handelCheckAll = () => {
        dipatch(checkedAllCart());
    };
    const [isChecked, setIsChecked] = useState(false);
    useEffect(() => {
        const items = carts.flatMap((val) => val.itemProducts);
        const isCheckedAll = items.filter((val) => val.isChecked).length === items.length;
        setIsChecked(isCheckedAll);
    }, [carts]);
    return (
        <div className="my-3 grid grid-cols-2 bg-white px-3 py-3">
            <div className="flex items-center">
                {checkbox && <input type="checkbox" className="mlr-3" onChange={handelCheckAll} checked={isChecked} />}
                <div className="mr-3">
                    <p className="ml-3 text-[15px] text-gray-500">Sản Phẩm</p>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <p className="ml-3 text-[15px] text-gray-500">Đơn Giá</p>
                <p className="ml-3 text-[15px] text-gray-500">Số Lượng</p>
                <p className="ml-3 text-[15px] text-gray-500">Số Tiền</p>
            </div>
        </div>
    );
}

export default HeaderItemCart;
