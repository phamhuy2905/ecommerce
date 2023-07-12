import { UseSideBarContext } from "../../context/sidebar.context";
export default function Main({ children }: { children: React.ReactNode }) {
    const { width } = UseSideBarContext();
    return (
        <div
            className={` w-[100%]  transition-all`}
            style={{
                marginLeft: width,
            }}
        >
            {children}
        </div>
    );
}
