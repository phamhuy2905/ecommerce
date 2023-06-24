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
                },
                shopId: product.productShop._id,
                shopName: product.productShop.fullName,
            })
        );

        toast.success("Thêm sản phẩm vào giỏ hàng thành công");
    };
    return (
        <>
            <p className="text-[16px] mb-4">
                <span className="mr-2"> Màu hiện có:</span>
                {product?.productAttribute.color?.length ? (
                    <>
                        {product?.productAttribute.color?.map((val, index) => {
                            return (
                                <span
                                    key={index}
                                    className="text-[15px] px-2 py-2 mr-3 border-[1px] border-gray-200 cursor-pointer"
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
            <p className="text-[16px] mb-4 flex items-center">
                <span className="mr-2">Size hiện có:</span>
                {product?.productAttribute.size?.map((val, index) => {
                    return (
                        <span
                            onClick={() => setSize(val)}
                            key={index}
                            className={`text-[18px] font-semibold w-[35px] h-[35px] text-center leading-[35px] mr-3  cursor-pointer  ${
                                size === val ? "border-blue-400 border-[2px]" : "border-gray-200 border-[1px]"
                            }`}
                        >
                            {val}
                        </span>
                    );
                })}
                <span className="ml-3 text-[14px] text-red-500">{"Vui lòng chọn size"}</span>
            </p>
            <div className="flex items-center mb-4 ">
                <div className="flex items-center bg-[#ddd]">
                    <button
                        onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                        className="text-[20px] text-gray-600 px-2 py-2"
                    >
                        <AiOutlineMinus />
                    </button>
                    <span className="text-[14px] text-gray-600 mx-2">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="text-[20px] text-gray-600 px-2 py-2">
                        <AiOutlinePlus />
                    </button>
                </div>
                <button
                    onClick={addToCart}
                    className="flex-1 ml-5 py-2 border-[1px] border-gray-400   bg-white hover:bg-black transition-all flex justify-center items-center text-[15px] text-black hover:text-white "
                >
                    Thêm vào giỏ hàng
                </button>
            </div>
            <button className="py-[10px] border-[1px] border-[#ddd] bg-blue-500 hover:bg-black transition-all flex justify-center items-center text-[15px] text-white mb-5">
                Mua ngay
            </button>
            <Toaster />
        </>
    );
}

export default FormProductDetail;
