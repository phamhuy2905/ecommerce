import { HiXMark } from "react-icons/hi2";
import { UseDarkModeContext } from "../../context/darkMode.context";
import { useState } from "react";

interface InputType {
    name: string;
    arr: string[];
    setArr: React.Dispatch<React.SetStateAction<string[]>>;
    placeholder: string;
}

function InputMultiple({ name, arr, setArr, placeholder }: InputType) {
    const { darkMode } = UseDarkModeContext();
    const [value, setValue] = useState<string>("");
    const hanleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.which === 13) {
            const found = arr.includes(value.toUpperCase());
            if (!found && value.trim().length) setArr([...arr, value.toUpperCase()]);
            setValue("");
        }
    };
    const handleDelete = (val: string) => {
        setArr(arr.filter((item) => item !== val));
    };
    return (
        <div className="my-2 flex flex-col">
            <div className="">
                <input
                    className={`${
                        darkMode ? "dark" : "  bg-white "
                    }focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2  text-sm leading-tight text-gray-700 shadow focus:outline-none `}
                    id={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={hanleEnter}
                />
            </div>
            <div className="mt-2">
                {arr.length ? (
                    <div className="focus:shadow-outline mb-3 flex appearance-none flex-wrap rounded border  text-sm leading-tight text-gray-700 shadow focus:outline-none ">
                        {arr.map((val, index) => {
                            return (
                                <div key={index} className="relative mx-2 my-2 bg-blue-500 px-3 py-2 ">
                                    <p className="  text-[14px] text-white">{val}</p>
                                    <span
                                        className="absolute right-[-15px] top-[-15px] cursor-pointer px-2 py-2 text-[18px] font-bold"
                                        onClick={() => handleDelete(val)}
                                    >
                                        <HiXMark />
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}

export default InputMultiple;
