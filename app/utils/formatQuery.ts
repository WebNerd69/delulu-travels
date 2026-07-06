const formatQuery = (query: string) => {
    const actualQuery = query
        .trim()
        .toLocaleLowerCase()
        .split(" ")
        .filter((v) => {
            if (v !== '') {
                return v;
            }
        })
        .join("+");
    return actualQuery;
};

export default formatQuery;
