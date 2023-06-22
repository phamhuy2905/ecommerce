import ProductItem from "../../../../components/ProductItem";
import { memo } from "react";
import ProductRow from "../../../../components/ProductRow";
import { ProductType } from "../../../../types/product.type";

function ProductGrid({ isGrid, products }: { isGrid: boolean; products: ProductType[] }) {
    return (
        <div className="mt-4">
            <div>
                {isGrid ? (
                    <div className="grid grid-cols-3 gap-6">
                        {products?.map((product, index) => {
                            return (
                                <div key={index} className="">
                                    <ProductItem product={product} border={false} bg="#f2f3f5" />
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {products?.map((product, index) => {
                            return (
                                <div key={index} className="">
                                    <ProductRow product={product} />
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default memo(ProductGrid);
