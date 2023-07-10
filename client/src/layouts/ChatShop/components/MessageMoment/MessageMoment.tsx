function MessageMoment({ message }: { message: string }) {
    return (
        <div className="mb-2 flex justify-center">
            <p className="max-w-[240px] px-2 py-[6px] text-[12px] text-gray-500 ">{message}</p>
        </div>
    );
}

export default MessageMoment;
