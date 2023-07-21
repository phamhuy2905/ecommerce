import { OrderShipping } from "../../Admin/types/order.type";

function TextAddress({ address, address2, province, district, ward }: OrderShipping) {
    return (
        <p className="text-[15px] text-gray-500">
            {`Địa chỉ: ${address2 ? address2 + ", " : ""} ${address}${", " + ward}${", " + district}${", " + province}`}
        </p>
    );
}

export default TextAddress;
