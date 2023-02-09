// https://masteringjs.io/tutorials/fundamentals/enum

export class Season {
    static Spring = new Season('Spring', 'SPRING');
    static Summer = new Season('Summer', 'SUMMER');
    static Fall = new Season('Fall', 'FALL');
    static Winter = new Season('Winter', 'WINTER');

    constructor(label, graphqlEnum) {
        this.label = label;
        this.graphqlEnum = graphqlEnum;
    }

    toString() {
        return `Season.${this.label}`;
    }
};

export const SEASONS = Object.keys(Season).map(season => Season[season]);