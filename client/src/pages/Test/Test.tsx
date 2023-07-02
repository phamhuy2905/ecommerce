import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";

function Test() {
    const refForm = useRef<HTMLFormElement>(null);
    const [avatar, setAvatar] = useState<string>("");

    const {
        formState: { errors },
        handleSubmit,
        register,
    } = useForm<{ name: string; age: string }>({
        defaultValues: {
            name: "",
            age: "",
        },
    });

    const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file: any = e.target.files![0];
        const url = URL.createObjectURL(file);
        setAvatar(url);
    };
    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatar);
        };
    }, [avatar]);

    const handlePost = handleSubmit(async (data) => {
        console.log(data);
        const fd = new FormData(refForm.current as HTMLFormElement);
        fd.set("test", JSON.stringify({ test: 1, acc: "sdf", boom: { location: 20 } }));

        await axios.post("http://localhost:3001/test", fd);
    });
    console.log(errors);

    return (
        <div>
            <form ref={refForm} action="" className="item flex flex-col" encType="multipart/form-data">
                <input type="text" placeholder="Your name..." id="name" {...register("name", { required: true })} />
                <input type="text" placeholder="Age..." id="age" {...register("age", { required: true })} />
                <input type="file" onChange={handleChangeFile} name="file" multiple />
                <button onClick={handlePost} className="bg-blue-300 px-2 py-1">
                    Submit
                </button>
                <img src={avatar} alt="" />
            </form>
        </div>
    );
}

export default Test;
