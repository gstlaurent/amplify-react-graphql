// https://stackoverflow.com/questions/14446511/most-efficient-method-to-groupby-on-an-array-of-objects
export const groupBy = (xs, key, explicitKeys = []) => {
    if (!xs) {
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

// https://dev.to/ramko9999/client-side-image-compression-on-the-web-26j7
function getImageDimensions(imageUrl) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = imageUrl;
        img.onload = function (e) {
            const width = this.width;
            const height = this.height;
            resolve({ height, width });
        }
    });
}

// https://dev.to/ramko9999/client-side-image-compression-on-the-web-26j7
function scaleImage(imageUrl, scale, initalWidth, initalHeight) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = imageUrl;

        const canvas = document.createElement("canvas");

        canvas.width = scale * initalWidth;
        canvas.height = scale * initalHeight;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        ctx.canvas.toBlob((blob) => {
            resolve(blob);
        }, "image/png");
    });
}

export const compressImage = async (imageFile) => {
    const imageUrl = URL.createObjectURL(imageFile);
    const { width, height } = await getImageDimensions(imageUrl);
    return await scaleImage(imageUrl, 0.5, width, height);
};


