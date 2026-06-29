const formatPrice = (units: number, nanos: number) => {
    const amount = units + nanos / 1_000_000_000;
    const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
    }).format(amount);

    return formatted;
};


export default formatPrice;
