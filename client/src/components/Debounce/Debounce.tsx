import { useState, useEffect } from "react";
export const Debounce = (value: string) => {
    const [data, setData] = useState("");
    useEffect(() => {
        const handel = setTimeout(() => {
            setData(value);
        }, 1000);
        return () => {
            clearTimeout(handel);
        };
    }, [value]);
    return data;
};
