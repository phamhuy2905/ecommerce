import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import InputDetail from "../../../../components/InputDetail";
import Tippy from "@tippyjs/react";
function ProductDetail() {
    const { productDetail } = useSelector((state: RootState) => state.productAdmin);
    return (
        <div>
            <h4 className="mb-1 flex items-center text-[20px] text-gray-600">Chi tiết sản phẩm</h4>
            <div className="h-[100px] w-[100px] overflow-hidden rounded-[10px] bg-gray-200 px-2 py-2">
                <img className="h-full w-full object-cover" src={productDetail.productThumbnail} alt="Product" />
            </div>
            <div className="my-5 grid grid-cols-3 gap-x-5 gap-y-4">
                <InputDetail title="Tên sản phẩm" value={productDetail.productName} />
                <InputDetail title="Loại sản phẩm" value={productDetail.productType} />
                <InputDetail title="Giá" value={productDetail.productPrice.toString()} />
                <InputDetail title="Số lượng" value={productDetail.productQuantity.toString()} />
                <InputDetail title="Brand" value={productDetail.productBrand} />
                <InputDetail title="Brand" value={productDetail.productBrand} />
                {productDetail.productAttribute.manufacture && (
                    <InputDetail title="Brand" value={productDetail.productAttribute.manufacture} />
                )}
                {productDetail.productAttribute.color && (
                    <InputDetail title="Color" value={productDetail.productAttribute.color.join("-")} />
                )}
                {productDetail.productAttribute.size && (
                    <InputDetail title="Size" value={productDetail.productAttribute.size.join("-")} />
                )}
                {productDetail.productAttribute.material && (
                    <InputDetail title="Material" value={productDetail.productAttribute.material} />
                )}
                {productDetail.productAttribute.manufacture && (
                    <InputDetail title="Manufacture" value={productDetail.productAttribute.manufacture} />
                )}
            </div>
            <Tippy content={productDetail.productDescription} theme="dark">
                <div>
                    <p className="mb-2 block text-sm font-semibold text-gray-700">Mô tả sản phẩm</p>
                    <p className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2  text-sm leading-tight text-gray-700 shadow focus:outline-none">
                        {productDetail.productDescription.slice(0, 100)}......
                    </p>
                </div>
            </Tippy>
            <div className="mt-2 flex flex-wrap items-center">
                {productDetail.productMultipleThumbnail.map((val, index) => {
                    return (
                        <div
                            key={index}
                            className="h-[120px] w-[120px] overflow-hidden rounded-[10px] bg-gray-200 px-2 py-2"
                        >
                            <img className="h-full w-full object-cover" src={val} alt="Product multiple" />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ProductDetail;
