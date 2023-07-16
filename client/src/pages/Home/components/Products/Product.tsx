import ProductItem from "../../../../components/ProductItem";
import { useQuery } from "react-query";
import { getProduct } from "../../../../apis/product.api";
import Title from "../../../../components/Tittle";
import { searchParams } from "../../../../utils/query";
import { useEffect } from "react";
import { observer } from "../../../../utils/observer";
function Product() {
    const { page } = searchParams();
    const { data } = useQuery({
        queryKey: ["products", +page],
        queryFn: () => getProduct({ page: +page || 1 }),
    });

    useEffect(() => {
        const images = document.querySelectorAll("#image");
        images.forEach((image) => {
            observer.observe(image);
        });
    }, [data]);
    return (
        <div className="py-5">
            <div className="mx-auto  px-4 xl:max-w-7xl">
                <Title header="Trending Products" label="See more" path="/shop-grid" />
                <div className="mt-3 grid grid-cols-4 gap-8">
                    {data?.data.data.products.map((product, index) => {
                        return (
                            <div key={index} className="">
                                <ProductItem product={product} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Product;
