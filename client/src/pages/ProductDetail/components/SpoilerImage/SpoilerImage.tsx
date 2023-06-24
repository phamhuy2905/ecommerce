import { useState } from "react";
import { ProductTypeDetaill } from "../../../../types/product.type";
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
function SpoilerImage({ product }: { product: ProductTypeDetaill | undefined }) {
    const [image, setImage] = useState<number>(0);
    const handleChangeImage = (index: number) => setImage(index);
    return (
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
                <img className="w-[580px] h-[670px] object-cover" src={product?.productThumbnail} alt="Product" />
            </div>
        </div>
    );
}

export default SpoilerImage;
