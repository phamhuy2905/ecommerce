interface FormConfirmProp {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    handleConfirm?: () => void;
}
function FormConfirm({ value, setValue, handleConfirm }: FormConfirmProp) {
    return (
        <div className="fixed left-0 top-0 z-10 h-full w-full " style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}>
            <div className="relative left-[50%] top-[40%] z-50 w-[300px] translate-x-[-50%] translate-y-[-50%] rounded-[10px] border-[1px] border-gray-300 bg-[#141414]">
                <div className="flex flex-col items-center py-4">
                    <h4 className="text-[15px] text-gray-400 ">Lí do hủy đơn</h4>
                    <input
                        className="userName my-7 rounded-[7px] border-[1px] border-gray-300 bg-[#141414] px-2 py-2 text-[12px] text-gray-400 outline-none"
                        type="text"
                        placeholder="Name...."
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                    <button
                        onClick={handleConfirm}
                        className="rounded-[7px] bg-blue-500 px-7 py-2 text-[12px] text-white "
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FormConfirm;
