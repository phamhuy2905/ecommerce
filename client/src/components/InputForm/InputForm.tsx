import type { UseFormRegister, RegisterOptions } from "react-hook-form";

interface Props {
    title?: string;
    messageError?: string;
    name: string;
    type?: React.HTMLInputTypeAttribute | undefined;
    placeholder?: string;
    register: UseFormRegister<any>;
    rule?: RegisterOptions;
}
function InputForm({ title, messageError, name, placeholder, register, rule, type = "text" }: Props) {
    return (
        <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor={name}>
                {title}
            </label>
            <input
                className={`w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border  rounded shadow appearance-none focus:outline-none focus:shadow-outline ${
                    messageError ? "border-red-500" : ""
                }`}
                id={name}
                type={type}
                placeholder={placeholder}
                {...register(name, rule)}
            />
            <p className="text-xs italic text-red-500 min-h-[16px]">{messageError}</p>
        </div>
    );
}

export default InputForm;
