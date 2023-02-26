// https://stackoverflow.com/questions/14446511/most-efficient-method-to-groupby-on-an-array-of-objects
export const groupBy = (xs, key, explicitKeys = []) => {
    if (xs === null) {
        return null;
    }
    let result = explicitKeys.reduce((rv, explicitKey) => {
        rv[explicitKey] = [];
        return rv;
    }, {});
    return xs.reduce((rv, x) => {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, result);
};


export const getRandomInt = (max) => Math.floor(Math.random() * max);

export const sortByStringProperty = (xs, sortKey) => {
    return xs.sort((a, b) => {
        if (a[sortKey] === null || b[sortKey] === null) {
            return 0;
        }
        const stringA = a[sortKey].toUpperCase(); // ignore upper and lowercase
        const stringB = b[sortKey].toUpperCase(); // ignore upper and lowercase
        if (stringA < stringB) {
            return -1;
        }
        if (stringA > stringB) {
            return 1;
        }

        // names must be equal
        return 0;
    });
};

export const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
}

export const setRandomArticleByUsage = (randomArticles, usage, articlesByUsage) => {
    const usageArticles = articlesByUsage[usage];
    if (usageArticles) {
        const index = getRandomInt(usageArticles.length);
        randomArticles[usage] = usageArticles.at(index);
    }
};

