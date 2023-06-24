import { AiFillStar } from "react-icons/ai";
import { ProductType } from "../../types/product.type";
import classNames from "classnames/bind";
import styles from "./ProductItem.module.scss";
import { formatCoin } from "../../utils/format";
import { path } from "../../helpers/path.helper";
const cx = classNames.bind(styles);

interface PropType {
    product: ProductType;
    bg?: string;
    border?: boolean;
}

function ProductItem({ product, bg = "white", border = true }: PropType) {
    const roundAverage = Math.round(+product.ratingsAverage || 4.5);
    const loopAverage = Array(roundAverage).fill(null);

    return (
        <div className={cx(` border-[1px] rounded-[10px] ${border ? "border-gray-200" : ""}`, { wrapper: true })}>
            <a
                className={`px-2  w-[260xp] h-[315px] overflow-hidden relative cursor-pointer`}
                style={{ backgroundColor: bg }}
                href={`${path.client.detail}/${product._id}`}
            >
                <img
                    id="image"
                    className={cx("w-full h-full object-cover", { image: true })}
                    data-src={product.productThumbnail}
                    alt="Product"
                />
            </a>
            <div className={`px-2  flex flex-col py-3  ${border ? "border-t-[1px] border-gray-300" : ""}`}>
                <p className="text-[14px] text-gray-600">{product.productType}</p>
                <h4 className="text-[17px] text-gray-800 my-2">{product.productName}</h4>
                <p className=" mb-4 relative">
                    {loopAverage.map((_, index) => {
                        // const percen =
                        //     (index + 1) / product.ratingsAverage <= 1
                        //         ? 100
                        //         : (product.ratingsAverage - Math.floor(product.ratingsAverage)) * 100;

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
                <p className="text-blue-500 text-[16px] ">{formatCoin(product.productPrice)}</p>
                <div className="flex items-center justify-center">
                    <a
                        href={`${path.client.detail}/${product._id}`}
                        className="bg-green-400 text-white text-[14px] py-1 px-5 rounded-[12px]"
                    >
                        Xem sản phẩm
                    </a>
                </div>
            </div>
        </div>
    );
}

export default ProductItem;
