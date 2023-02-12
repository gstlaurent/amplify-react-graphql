// https://masteringjs.io/tutorials/fundamentals/enum
class Usage {
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

const USAGES = Object.keys(Usage).map(usage => Usage[usage]);

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



