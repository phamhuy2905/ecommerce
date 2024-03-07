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
        <div className={cx(` rounded-[10px] border-[1px] ${border ? "border-gray-200" : ""}`, { wrapper: true })}>
            <a
                className={`relative  h-[315px] w-[260xp] cursor-pointer overflow-hidden px-2`}
                style={{ backgroundColor: bg }}
                href={`${path.client.detail}/${product._id}`}
            >
                <img
                    id="image"
                    className={cx("h-full w-full object-cover", { image: true })}
                    data-src={product.productThumbnail}
                    alt="Product"
                />
            </a>
            <div className={`flex  flex-col px-2 py-3  ${border ? "border-t-[1px] border-gray-300" : ""}`}>
                <p className="text-[14px] text-gray-600">{product.productType}</p>
                <h4 className="my-2 text-[17px] text-gray-800">{product.productName}</h4>
                <p className=" relative mb-4">
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
                                <AiFillStar className={`absolute text-[15px] text-gray-500 `} />
                                <AiFillStar
                                    className={`absolute overflow-hidden text-[15px]  text-orange-400`}
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
                <p className="text-[16px] text-blue-500 ">{formatCoin(product.productPrice as number)}</p>
                <div className="flex items-center justify-center">
                    <a
                        href={`${path.client.detail}/${product._id}`}
                        className="rounded-[12px] bg-green-400 px-5 py-1 text-[14px] text-white"
                    >
                        Xem sản phẩm
                    </a>
                </div>
            </div>
        </div>
    );
}

export default ProductItem;
