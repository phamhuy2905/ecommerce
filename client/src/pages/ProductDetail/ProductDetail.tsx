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
    if (!product) return;
    return (
        <div className="mt-10">
            <div className="content">
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-7 col-start-1">
                        <SpoilerImage product={product} />
                    </div>
                    <div className=" col-span-5">
                        <div className="flex flex-col px-2">
                            <h5 className="mb-1 text-[18px] text-gray-600">{product?.productType}</h5>
                            <h2 className="mb-2 text-[40px] font-semibold text-black">{product?.productName}</h2>
                            <p className="mb-4 text-[16px] text-gray-600">
                                {product?.productDescription + "..."}{" "}
                                {product?.productDescription && product?.productDescription.length > 100 && (
                                    <span className="cursor-pointer">See more</span>
                                )}
                            </p>
                            <p className="mb-4 text-[16px]">
                                Giá hiện tại:{" "}
                                <span className="text-[18px] font-semibold">
                                    {formatCoin(product?.productPrice || 0)}
                                </span>
                            </p>
                            <p className="mb-4 text-[16px]">
                                Số hàng còn trong kho:{" "}
                                <span className="text-[18px] font-semibold">{product?.productQuantity}</span>
                            </p>
                            <FormProductDetail product={product} />

                            <div className="border-t-[1px] border-[#ddd] py-4">
                                <p className="mb-2 flex items-center">
                                    <span className="mr-2 text-[14px] text-black">Tên shop:</span>
                                    <span className="text-[14px] text-gray-500">{product?.productShop.fullName}</span>
                                </p>
                                <p className="mb-2 flex items-center">
                                    <span className="mr-2 text-[14px] text-black">Địa điểm:</span>
                                    <span className="text-[14px] text-gray-500">{product?.productShop.address}</span>
                                </p>
                                <p className="mb-2 flex items-center">
                                    <span className="mr-2 text-[14px] text-black">Đánh giá:</span>
                                    <span className="text-[14px] text-gray-500">
                                        {" "}
                                        {product?.ratingsAverage + " sao"}
                                    </span>
                                </p>
                            </div>
                            <div className="flex items-center">
                                <span className="mr-2 text-[14px]">Share: </span>
                                <a
                                    href="/"
                                    className=" mr-2 flex h-[35px] w-[35px] items-center justify-center rounded-full border-[1px] border-[#ddd] bg-white hover:bg-blue-400 hover:text-white"
                                >
                                    <AiFillLinkedin />
                                </a>
                                <a
                                    href="/"
                                    className=" mr-2 flex h-[35px] w-[35px] items-center justify-center rounded-full border-[1px] border-[#ddd] bg-white hover:bg-blue-400 hover:text-white"
                                >
                                    <RiFacebookFill />
                                </a>
                                <a
                                    href="/"
                                    className=" mr-2 flex h-[35px] w-[35px] items-center justify-center rounded-full border-[1px] border-[#ddd] bg-white hover:bg-blue-400 hover:text-white"
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
