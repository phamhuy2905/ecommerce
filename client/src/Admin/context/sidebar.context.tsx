import { createContext, useState, useContext } from "react";
import { UseDarkModeContext } from "./darkMode.context";

interface ContextSideBar {
    width: string;
    setWidth: React.Dispatch<React.SetStateAction<string>>;
    collapse: boolean;
    setCollapse: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBarContext = createContext<ContextSideBar>({
    width: "280px",
    setWidth: () => {},
    collapse: false,
    setCollapse: () => {},
});

export default function SideBarContextProvider({ children }: { children: React.ReactNode }) {
    const [width, setWidth] = useState("280px");
    const [collapse, setCollapse] = useState(false);
    const { darkMode } = UseDarkModeContext();
    return (
        <SideBarContext.Provider
            value={{
                width,
                setWidth,
                collapse,
                setCollapse,
            }}
        >
            <div className={`${darkMode ? "dark" : "light"} flex w-[100%]`}>{children}</div>
        </SideBarContext.Provider>
    );
}

export const UseSideBarContext = () => useContext(SideBarContext);
