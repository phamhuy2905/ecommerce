import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { ProductTypeDetaill } from "../../../../types/product.type";
import { useState } from "react";
import { useAppDispatch } from "../../../../redux/store";
import { addCart } from "../../../../redux/cart.slice";
import toast, { Toaster } from "react-hot-toast";
function FormProductDetail({ product }: { product: ProductTypeDetaill }) {
    const [size, setSize] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(1);
    const dispatch = useAppDispatch();
    const addToCart = () => {
        if (!size) return;
        dispatch(
            addCart({
                item: {
                    id: product._id,
                    quantity,
                    size,
                    name: product.productName,
                    price: product.productPrice,
                    thumbnail: product.productThumbnail,
                    color: "Unknow",
                    isChecked: false,
                },
                shopId: product.productShop._id,
                shopName: product.productShop.fullName,
            })
        );

        toast.success("Thêm sản phẩm vào giỏ hàng thành công");
    };
    return (
        <>
            <p className="mb-4 text-[16px]">
                <span className="mr-2"> Màu hiện có:</span>
                {product?.productAttribute.color?.length ? (
                    <>
                        {product?.productAttribute.color?.map((val, index) => {
                            return (
                                <span
                                    key={index}
                                    className="mr-3 cursor-pointer border-[1px] border-gray-200 px-2 py-2 text-[15px]"
                                >
                                    {val}
                                </span>
                            );
                        })}
                    </>
                ) : (
                    <span>Unkown</span>
                )}
            </p>
            <p className="mb-4 flex items-center text-[16px]">
                <span className="mr-2">Size hiện có:</span>
                {product?.productAttribute.size?.map((val, index) => {
                    return (
                        <span
                            onClick={() => setSize(val)}
                            key={index}
                            className={`mr-3 h-[35px] w-[35px] cursor-pointer text-center text-[18px] font-semibold  leading-[35px]  ${
                                size === val ? "border-[2px] border-blue-400" : "border-[1px] border-gray-200"
                            }`}
                        >
                            {val}
                        </span>
                    );
                })}
                <span className="ml-3 text-[14px] text-red-500">{"Vui lòng chọn size"}</span>
            </p>
            <div className="mb-4 flex items-center ">
                <div className="flex items-center bg-[#ddd]">
                    <button
                        onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                        className="px-2 py-2 text-[20px] text-gray-600"
                    >
                        <AiOutlineMinus />
                    </button>
                    <span className="mx-2 text-[14px] text-gray-600">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="px-2 py-2 text-[20px] text-gray-600">
                        <AiOutlinePlus />
                    </button>
                </div>
                <button
                    onClick={addToCart}
                    className="ml-5 flex flex-1 items-center justify-center   border-[1px] border-gray-400 bg-white py-2 text-[15px] text-black transition-all hover:bg-black hover:text-white "
                >
                    Thêm vào giỏ hàng
                </button>
            </div>
            <button className="mb-5 flex items-center justify-center border-[1px] border-[#ddd] bg-blue-500 py-[10px] text-[15px] text-white transition-all hover:bg-black">
                Mua ngay
            </button>
            <Toaster />
        </>
    );
}

export default FormProductDetail;
