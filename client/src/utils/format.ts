export const formatCoin = (price: number) =>
    price.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 });
