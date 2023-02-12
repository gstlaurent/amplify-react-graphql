import { useState } from "react";

// https://masteringjs.io/tutorials/fundamentals/enum
class Season {
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

const SEASONS = Object.keys(Season).map(season => Season[season]);

export const SeasonGroup = () => {
  const [numChecked, setNumChecked] = useState(0);

  const handleCheckChange = (isChecked) => {
    if (isChecked) {
      setNumChecked(numChecked + 1);
    } else {
      setNumChecked(numChecked - 1);
    }
  }

  return (
    <fieldset>
      <legend>Seasons</legend>
      {SEASONS.map(({ label, graphqlEnum }) => {
        const id = `season-${graphqlEnum}`;
        return (
          <div className="list-item" key={id}>
            <input
              type="checkbox"
              id={id}
              name="seasons"
              value={graphqlEnum}
              onChange={(e) => handleCheckChange(e.target.checked)}
              required={numChecked === 0}
            />
            <label htmlFor={id}>{label}</label>
          </div>
        );
      })}
    </fieldset>
  );
};