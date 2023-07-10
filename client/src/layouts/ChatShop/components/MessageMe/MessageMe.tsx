function MessageMe({ message }: { message: string }) {
    return (
        <div className="mb-2 flex justify-end">
            <p className="max-w-[240px]  bg-blue-300 px-2 py-[6px] text-[13px] ">{message}</p>
        </div>
    );
}

export default MessageMe;
