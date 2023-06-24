const options: IntersectionObserverInit = {
    root: null,
    rootMargin: "0px",
    threshold: 0.6,
};

const observer = new IntersectionObserver((entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const image: any = entry.target;

            image.src = image.dataset.src;

            observer.unobserve(image);
        }
    });
}, options);

export { observer };
