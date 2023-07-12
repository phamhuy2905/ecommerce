import toast, { Toaster } from "react-hot-toast";
import { validateImg } from "../../../helpers/validateImage";
import { useState, useEffect } from "react";
interface FileDragType {
    title: string;
    name: string;
    multiple?: boolean;
    file: any;
    setFile: React.Dispatch<any>;
}
function FileDrag({ title, name, multiple = false, setFile, file }: FileDragType) {
    const [key, setKey] = useState(1);
    const hanfleChangeFile = (e: any) => {
        const check = validateImg(e);
        if (!check) {
            toast.error("File chỉ được dạng gif, png, jpg, jpe");
            setKey(Date.now());
            return;
        }
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(e.target.files[0]);
        setFile(file);
    };
    useEffect(() => {
        return () => {
            if (file) URL.revokeObjectURL(file.preview);
        };
    }, [file]);
    return (
        <div className="mb-10">
            <p className="mb-2 text-gray-500">{title}</p>
            <div className="flex w-full items-center justify-center">
                <label
                    htmlFor={name}
                    className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 "
                >
                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                        <svg
                            className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400"> PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input
                        id={name}
                        type="file"
                        className="hidden"
                        name={name}
                        multiple={multiple}
                        onChange={hanfleChangeFile}
                        key={key}
                    />
                </label>
            </div>

            {file && (
                <div className="mt-3 overflow-hidden">
                    <img
                        className="h-[170px] w-[170px] rounded-[7px] object-cover"
                        key={Date.now()}
                        src={file.preview}
                        alt="Preview"
                    />
                </div>
            )}
            <Toaster />
        </div>
    );
}

export default FileDrag;
