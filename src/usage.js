// https://masteringjs.io/tutorials/fundamentals/enum
export class Usage {
  static TOP = new Usage('Top', 'Tops', 'TOP', '👚');
  static BOTTOM = new Usage('Bottom', 'Bottoms', 'BOTTOM', '👖');
  static DRESS = new Usage('Dress', 'Dresses', 'DRESS', '👗');
  static SWEATER = new Usage('Sweater', 'Sweaters', 'SWEATER', '🥋');
  static OUTERWEAR = new Usage('Outerwear', 'Outerwear', 'OUTERWEAR', '🧥');
  static SHOES = new Usage('Shoes', 'Shoes', 'SHOES', '👟');
  static ACCESSORY = new Usage('Accessory', 'Accessories', 'ACCESSORY', '📿');
  static BAG = new Usage('Bag', 'Bags', 'BAG', '👜');

  constructor(label, plural_label, graphqlEnum, emoji) {
    this.label = label;
    this.graphqlEnum = graphqlEnum;
    this.plural_label = plural_label;
    this.emoji = emoji;
  }

  toString() {
    return `Usage.${this.graphqlEnum}`;
  }
}

export const USAGES = Object.values(Usage);



export const UsageRadioGroup = () => {
  return (
    <fieldset>
      <legend>Category</legend>
      {USAGES.map(({ label, graphqlEnum, emoji }) => {
        const id = `usage-${graphqlEnum}`;
        return (
          <div className="list-item" key={id}>
            <input
              type="radio"
              id={id}
              name="usage"
              value={graphqlEnum}
              required
            />
            <label htmlFor={id}>{`${emoji} ${label}`}</label>
          </div>
        );
      })}
    </fieldset>
  );
};



