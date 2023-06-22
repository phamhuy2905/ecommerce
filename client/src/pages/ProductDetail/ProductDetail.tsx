import { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus, AiOutlineTwitter, AiFillLinkedin } from "react-icons/ai";
import { RiFacebookFill } from "react-icons/ri";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getProductDetail } from "../../apis/product.api";
import { formatCoin } from "../../utils/format";
const images: { larger: string; small: string }[] = [
    {
        small: "https://shofy-client.vercel.app/_next/image?url=https%3A%2F%2Fi.ibb.co%2Fj4sDV3Q%2Fwatch-5.png&w=96&q=75",
        larger: "https://shofy-client.vercel.app/_next/image?url=https%3A%2F%2Fi.ibb.co%2Fj4sDV3Q%2Fwatch-5.png&w=640&q=75",
    },
    {
        small: "https://shofy-client.vercel.app/_next/image?url=https%3A%2F%2Fi.ibb.co%2FhDwW5Td%2Fwatch-6.png&w=640&q=75",
        larger: "https://shofy-client.vercel.app/_next/image?url=https%3A%2F%2Fi.ibb.co%2FhDwW5Td%2Fwatch-6.png&w=640&q=75",
    },
    {
        small: "https://shofy-client.vercel.app/_next/image?url=https%3A%2F%2Fi.ibb.co%2F6HFLgPB%2Fwatch-7.png&w=640&q=75",
        larger: "https://shofy-client.vercel.app/_next/image?url=https%3A%2F%2Fi.ibb.co%2F6HFLgPB%2Fwatch-7.png&w=640&q=75",
    },
    {
        small: "https://shofy-client.vercel.app/_next/image?url=https%3A%2F%2Fi.ibb.co%2FJxJ0XS4%2Fwatch-8.png&w=640&q=75",
        larger: "https://shofy-client.vercel.app/_next/image?url=https%3A%2F%2Fi.ibb.co%2FJxJ0XS4%2Fwatch-8.png&w=640&q=75",
    },
];
function ProductDetail() {
    const [image, setImage] = useState<number>(0);
    const handleChangeImage = (index: number) => setImage(index);
    const { id } = useParams();

    const { data } = useQuery({
        queryKey: ["detail", id],
        queryFn: () => getProductDetail(id?.toString() as string),
    });
    const product = data?.data.data;
    return (
        <div className="mt-10">
            <div className="content">
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-start-1 col-span-7">
                        <div className="flex items-start">
                            <div className="flex flex-col mr-2">
                                {images.map((val, index) => {
                                    return (
                                        <div
                                            onClick={() => handleChangeImage(index)}
                                            key={index}
                                            className={`w-[85px] h-[100px]  overflow-hidden mb-2 bg-[#f5f6f8] cursor-pointer border-[1px] ${
                                                index === image ? "border-gray-500" : "border-transparent"
                                            }`}
                                        >
                                            <img className="w-full h-full object-cover" src={val.small} alt="Product" />
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="bg-[#f5f6f8]">
                                <img
                                    className="w-[580px] h-[670px] object-cover"
                                    src={product?.productThumbnail}
                                    alt="Product"
                                />
                            </div>
                        </div>
                    </div>
                    <div className=" col-span-5">
                        <div className="px-2 flex flex-col">
                            <h5 className="text-[18px] text-gray-600 mb-1">{product?.productType}</h5>
                            <h2 className="text-[40px] text-black font-semibold mb-2">{product?.productName}</h2>
                            <p className="text-[16px] text-gray-600 mb-4">
                                {product?.productDescription + "..."}{" "}
                                {product?.productDescription && product?.productDescription.length > 100 && (
                                    <span className="cursor-pointer">See more</span>
                                )}
                            </p>
                            <p className="text-[16px] mb-4">
                                Giá hiện tại:{" "}
                                <span className="text-[18px] font-semibold">
                                    {formatCoin(product?.productPrice || 0)}
                                </span>
                            </p>
                            <p className="text-[16px] mb-4">
                                Số hàng còn trong kho:{" "}
                                <span className="text-[18px] font-semibold">{product?.productQuantity}</span>
                            </p>
                            <p className="text-[16px] mb-4">
                                Màu hiện có: <span className="text-[15px] font-semibold">Unkown</span>
                            </p>
                            <p className="text-[16px] mb-4">
                                Size hiện có:{" "}
                                {product?.productAttribute.size?.map((val, index) => {
                                    return (
                                        <span key={index} className="text-[18px] font-semibold">
                                            {val +
                                                (index + 1 === product?.productAttribute.size?.length ? "" : "  ,  ")}
                                        </span>
                                    );
                                })}
                            </p>
                            <div className="flex items-center mb-4 ">
                                <div className="flex items-center bg-[#ddd]">
                                    <button className="text-[20px] text-gray-600 px-2 py-2">
                                        <AiOutlinePlus />
                                    </button>
                                    <span className="text-[14px] text-gray-600 mx-2">20</span>
                                    <button className="text-[20px] text-gray-600 px-2 py-2">
                                        <AiOutlineMinus />
                                    </button>
                                </div>
                                <button className="flex-1 ml-5 py-2 border-[1px] border-gray-400   bg-white hover:bg-black transition-all flex justify-center items-center text-[15px] text-black hover:text-white ">
                                    Thêm vào giỏ hàng
                                </button>
                            </div>
                            <button className="py-[10px] border-[1px] border-[#ddd] bg-blue-500 hover:bg-black transition-all flex justify-center items-center text-[15px] text-white mb-5">
                                Mua ngay
                            </button>

                            <div className="py-4 border-[#ddd] border-t-[1px]">
                                <p className="flex items-center mb-2">
                                    <span className="text-[14px] text-black mr-2">Tên shop:</span>
                                    <span className="text-[14px] text-gray-500">{product?.productShop.fullName}</span>
                                </p>
                                <p className="flex items-center mb-2">
                                    <span className="text-[14px] text-black mr-2">Địa điểm:</span>
                                    <span className="text-[14px] text-gray-500">{product?.productShop.address}</span>
                                </p>
                                <p className="flex items-center mb-2">
                                    <span className="text-[14px] text-black mr-2">Đánh giá:</span>
                                    <span className="text-[14px] text-gray-500">
                                        {" "}
                                        {product?.ratingsAverage + " sao"}
                                    </span>
                                </p>
                            </div>
                            <div className="flex items-center">
                                <span className="text-[14px] mr-2">Share: </span>
                                <a
                                    href="/"
                                    className=" w-[35px] h-[35px] bg-white hover:bg-blue-400 rounded-full border-[1px] border-[#ddd] hover:text-white flex items-center justify-center mr-2"
                                >
                                    <AiFillLinkedin />
                                </a>
                                <a
                                    href="/"
                                    className=" w-[35px] h-[35px] bg-white hover:bg-blue-400 rounded-full border-[1px] border-[#ddd] hover:text-white flex items-center justify-center mr-2"
                                >
                                    <RiFacebookFill />
                                </a>
                                <a
                                    href="/"
                                    className=" w-[35px] h-[35px] bg-white hover:bg-blue-400 rounded-full border-[1px] border-[#ddd] hover:text-white flex items-center justify-center mr-2"
                                >
                                    <AiOutlineTwitter />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
