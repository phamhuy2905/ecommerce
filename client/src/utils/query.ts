import { useSearchParams } from "react-router-dom";

export const searchParams = () => {
    const [query] = useSearchParams();
    return Object.fromEntries(query);
};
