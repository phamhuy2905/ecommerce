import { AiOutlineTwitter, AiFillLinkedin } from "react-icons/ai";
import { RiFacebookFill } from "react-icons/ri";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getProductDetail } from "../../apis/product.api";
import { formatCoin } from "../../utils/format";
import SpoilerImage from "./components/SpoilerImage";
import FormProductDetail from "./components/FormProductDetail";

function ProductDetail() {
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
                        <SpoilerImage product={product} />
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
                            <FormProductDetail product={product} />

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
