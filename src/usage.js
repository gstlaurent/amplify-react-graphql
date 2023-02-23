// https://masteringjs.io/tutorials/fundamentals/enum
export class Usage {
  static TOP = new Usage('Top', 'TOP');
  static BOTTOM = new Usage('Bottom', 'BOTTOM');
  static DRESS = new Usage('Dress', 'DRESS');
  static OUTERWEAR = new Usage('Outerwear', 'OUTERWEAR');
  static SHOES = new Usage('Shoes', 'SHOES');
  static ACCESSORY = new Usage('Accessory', 'ACCESSORY');
  static BAG = new Usage('Bag', 'BAG');
  static SWEATER = new Usage('Sweater', 'SWEATER');

  constructor(label, graphqlEnum) {
    this.label = label;
    this.graphqlEnum = graphqlEnum;
  }

  toString() {
    return `Usage.${this.label}`;
  }
}

export const USAGES = Object.keys(Usage).map(usage => Usage[usage]);



export const UsageRadioGroup = () => {
  return (
    <fieldset>
      <legend>Usage</legend>
      {USAGES.map(({ label, graphqlEnum }) => {
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
            <label htmlFor={id}>{label}</label>
          </div>
        );
      })}
    </fieldset>
  );
};



