import { BsFillChatRightFill } from "react-icons/bs";
import { useAppDispatch } from "../../../../redux/store";
import { chooseShopChat } from "../../../../redux/actions/chat.slice";
import { useAuthContext } from "../../../../context/auth.context";
function ItemShop({ shopName, shopId }: { shopName: string; shopId: string }) {
    const dispatch = useAppDispatch();
    const { profile } = useAuthContext();
    const handleChooseShopChat = () => {
        if (!profile) return;
        dispatch(chooseShopChat({ senderId: profile._id, recevierId: shopId, nameRecevier: shopName, message: "" }));
    };
    return (
        <div className="my-2 flex items-center  text-[16px]">
            Tên shop: <span className="ml-2 text-[16px] font-light">{shopName}</span>
            <p className="ml-5 flex cursor-pointer items-center text-green-400" onClick={handleChooseShopChat}>
                <span className="mr-1 text-[14px]">Chat ngay</span>
                <BsFillChatRightFill className="mt-1 text-[12px] " />
            </p>
        </div>
    );
}

export default ItemShop;
