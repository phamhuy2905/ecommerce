import { statusOrder as statusOrderInit } from "../../Admin/types/order.type";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    statusOrder:
        | "pending"
        | "shipped"
        | "confirmed"
        | "cancel_by_user"
        | "cancel_by_shop"
        | "cancel_by_admin"
        | "deliverid";
}

function ButtonStatusOrder({ statusOrder, ...props }: ButtonProps) {
    return (
        <button
            {...props}
            className={`rounded-[5px] px-2 py-1 text-[15px] text-white ${statusOrderInit[statusOrder].color}`}
        >
            {statusOrderInit[statusOrder].status}
        </button>
    );
}

export default ButtonStatusOrder;
