const validateImg = (e: any) => {
    const data = Object.keys(e.target.files);
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        const check = data.every((val) => /(\.|\/)(gif|jpe?g|png)$/i.test(e.target.files[val].type));
        if (!check) return false;
    } else return false;
    return data;
};

export { validateImg };
