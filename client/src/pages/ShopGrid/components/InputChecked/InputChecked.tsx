import { useState } from "react";

function InputChecked({ name }: { name: string }) {
    const [isChecked, setIsChecked] = useState(false);
    const handleChange = () => {
        setIsChecked(!isChecked);
    };
    return (
        <div className="flex items-center py-2  select-none">
            <input onChange={handleChange} className="text-orange-400" type="checkbox" id={name} checked={isChecked} />
            <label className="ml-3 text-[15px] text-gray-500 cursor-pointer" htmlFor={name}>
                {name}
            </label>
        </div>
    );
}

export default InputChecked;
