const formatDate = (date: any) => {
    return date.toISOString().split("T")[0];
};

export default formatDate;
