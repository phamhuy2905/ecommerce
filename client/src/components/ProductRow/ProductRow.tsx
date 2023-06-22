import { AiFillStar } from "react-icons/ai";
import { ProductType } from "../../types/product.type";
import classNames from "classnames/bind";
import styles from "../ProductItem/ProductItem.module.scss";
const cx = classNames.bind(styles);
function ProductRow({ product }: { product: ProductType }) {
    const roundAverage = Math.round(+product.ratingsAverage || 4.5);

    const loopAverage = Array(roundAverage).fill(null);
    return (
        <div className="flex bg-white ">
            <div
                className={`px-2  w-[260xp] h-[315px] overflow-hidden relative cursor-pointer bg-[#f2f3f5] rounded-[10px]`}
            >
                <img
                    className={cx("w-full h-full object-cover", { image: true })}
                    src={product.productThumbnail}
                    alt="Product"
                />
            </div>
            <div
                className={`flex flex-col justify-center border-[1px] border-[#ddd] px-10 rounded-[10px]`}
                style={{ borderLeft: "none" }}
            >
                <p className="text-[14px] text-gray-600">{product.productType}</p>
                <h4 className="text-[17px] text-gray-800 my-2">{product.productName}</h4>
                <p className=" mb-5 relative">
                    {loopAverage.map((_, index) => {
                        const percen =
                            (index + 1) / product.ratingsAverage <= 1
                                ? 100
                                : (product.ratingsAverage - Math.floor(product.ratingsAverage)) * 100;

                        return (
                            <span
                                key={index}
                                className="absolute "
                                style={{
                                    left: `${index === 0 ? 0 : index * 15}px`,
                                }}
                            >
                                <AiFillStar className={`text-[15px] text-gray-500 absolute `} />
                                <AiFillStar
                                    className={`text-[15px] text-orange-400 absolute  overflow-hidden`}
                                    style={
                                        {
                                            // left: percen === 100 ? 0 + "%" : -percen + "%",
                                        }
                                    }
                                />
                            </span>
                        );
                    })}
                </p>
                <p className="text-blue-500 text-[16px] mb-2 ">{product.productPrice}</p>
                <span className="text-black  text-[15px] font-light mb-3 ">{product.productDescription}</span>
                <div className="flex items-center ">
                    <button className="bg-black text-white text-[14px] py-2 px-6 rounded-[5px]">Add to cart</button>
                </div>
            </div>
        </div>
    );
}

export default ProductRow;
