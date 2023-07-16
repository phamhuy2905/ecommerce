import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/store";
import { dispatchCheckOutNote } from "../../redux/checkout.slice";
import Debounce from "../Debounce";

function NoteShop({ shopId, disabled = false, value = "" }: { shopId: string; disabled?: boolean; value?: string }) {
    const [note, setNote] = useState<string>(value);
    const debounce = Debounce(note);
    const dispatch = useAppDispatch();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNote(e.target.value);
    };
    useEffect(() => {
        dispatch(dispatchCheckOutNote({ shopId, node: debounce }));
    }, [debounce]);
    return (
        <div className="flex items-center ">
            <p className="mr-2 text-[14px]">Lời nhắn:</p>
            <input
                disabled={disabled}
                className="flex-1 border-[1px] border-[#ddd] px-2 py-2 text-[13px] outline-none"
                type="text"
                placeholder="Lưu ý cho người bán"
                onChange={handleChange}
                value={note}
            />
        </div>
    );
}

export default NoteShop;
