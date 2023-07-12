import { createContext, useContext, useState } from "react";

const DarkModeContext = createContext<{ darkMode: boolean; toggleDarkMode: () => void }>({
    darkMode: false,
    toggleDarkMode: () => {},
});

const DarkModeContextProvider = ({ children }: { children: JSX.Element }) => {
    const [darkMode, setDarkMode] = useState(false);
    function toggleDarkMode() {
        setDarkMode((prevDarkMode) => !prevDarkMode);
    }
    return <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>{children}</DarkModeContext.Provider>;
};

export default DarkModeContextProvider;
export const UseDarkModeContext = () => useContext(DarkModeContext);
