// https://masteringjs.io/tutorials/fundamentals/enum

export class Usage {
    static Top = new Usage('Top', 'TOP');
    static Bottom = new Usage('Bottom', 'BOTTOM');
    static Dress = new Usage('Dress', 'DRESS');
    static Outerwear = new Usage('Outerwear', 'OUTERWEAR');
    static Shoes = new Usage('Shoes', 'SHOES');
    static Accessory = new Usage('Accessory', 'ACCESSORY');
    static Sweater = new Usage('Sweater', 'SWEATER');

    constructor(label, graphqlEnum) {
        this.label = label;
        this.graphqlEnum = graphqlEnum;
    }

    toString() {
        return `Usage.${this.label}`;
    }
}

export const USAGES = Object.keys(Usage).map(usage => Usage[usage]);