interface PopperProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    title: string;
}

function Popper({ title, ...props }: PopperProps) {
    return (
        <button {...props} className={`rounded-[5px] px-2 py-1 text-[15px] text-white ${props.className}`}>
            {title}
        </button>
    );
}

export default Popper;
