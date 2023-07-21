import { OrderShipping } from "../../Admin/types/order.type";

function TextInfomation({ fullName, phoneNumber }: OrderShipping) {
    return <p className="text-[15px] text-gray-500">Người nhận: {`${fullName} +84(${phoneNumber}) `}</p>;
}

export default TextInfomation;
