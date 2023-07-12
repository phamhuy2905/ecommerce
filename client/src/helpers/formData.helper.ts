const formData = (form: FormData, data: any) => {
    const keys = Object.keys(data);
    keys.forEach((key) => {
        if (Array.isArray(data[key]) && data[key].length > 0) {
            form.delete(key);
            data[key].forEach((value: any) => form.append(key, value));
        } else if (typeof data[key] === "string" || typeof data[key] === "number") {
            form.set(key, data[key]);
        } else {
            if (typeof data[key] === "object") {
                formData(form, data[key]);
            } else {
                form.set(key, data[key]);
            }
        }
    });
    return form;
};

const formDataV2 = (form: FormData, data: any, namespace?: string) => {
    for (let property in data) {
        const key = namespace ? `${namespace}[${property}]` : property;
        if (Array.isArray(data[property]) && data[property].length > 0) {
            form.delete(key);
            data[property].forEach((value: any) => form.append(key, value));
        } else if (typeof data[property] === "string" || typeof data[property] === "number") {
            form.set(key, data[property]);
        } else {
            if (data[property] instanceof File) {
                form.set(key, data[key]);
            } else if (typeof data[property] === "object") {
                formDataV2(form, data[key], key);
            } else {
                form.set(key, data[key]);
            }
        }
    }
    return form;
};

export { formData, formDataV2 };
