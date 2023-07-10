function MessageClient({ message }: { message: string }) {
    return (
        <div className="mb-2 flex justify-start">
            <p className="max-w-[240px] bg-[#e3e4e6] px-2 py-[6px] text-[13px] ">{message}</p>
        </div>
    );
}

export default MessageClient;
