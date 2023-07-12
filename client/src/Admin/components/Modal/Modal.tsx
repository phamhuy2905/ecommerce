import { memo, useEffect, useRef } from "react";
import { HiXMark } from "react-icons/hi2";
import { UseDarkModeContext } from "../../context/darkMode.context";
import { createPortal } from "react-dom";

interface ModalType {
    children: React.ReactNode;
    isOpen: boolean;
    setIsOpen: any;
}
function Modal({ children, isOpen, setIsOpen }: ModalType) {
    const { darkMode } = UseDarkModeContext();
    const overlay = useRef<HTMLDivElement>(null);
    const handelClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const target = e.target;
        if (target === overlay.current) {
            setIsOpen(false);
        }
    };
    useEffect(() => {
        window.addEventListener("keydown", function (e) {
            e.which === 27 && setIsOpen(false);
        });
    }, [isOpen, setIsOpen]);
    return (
        isOpen &&
        createPortal(
            <div
                onClick={handelClose}
                ref={overlay}
                className="fixed left-0 top-0 z-10 h-[100%] w-[100%]"
                style={{
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                }}
            >
                <div
                    className={`${
                        darkMode ? "dark" : "bg-white"
                    } relative left-[50%] top-[50%]  h-[670px] w-[50%] translate-x-[-50%] translate-y-[-50%] overflow-y-scroll px-4 py-5 shadow-lg`}
                >
                    <span
                        onClick={() => setIsOpen(false)}
                        className={`${
                            darkMode ? "text-white" : "text-black"
                        } absolute right-3 top-5 cursor-pointer text-[20px] `}
                    >
                        <HiXMark />
                    </span>
                    {children}
                </div>
            </div>,
            document.body
        )
    );
}

export default memo(Modal);
