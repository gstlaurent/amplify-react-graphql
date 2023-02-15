import { useState } from "react";

// https://masteringjs.io/tutorials/fundamentals/enum
export class Season {
  static Spring = new Season('Spring', 'SPRING', '🌱');
  static Summer = new Season('Summer', 'SUMMER', '🌞');
  static Autumn = new Season('Autumn', 'FALL', '🍂');
  static Winter = new Season('Winter', 'WINTER', '❄️');

  constructor(label, graphqlEnum, emoji) {
    this.label = label;
    this.graphqlEnum = graphqlEnum;
    this.emoji = emoji;
  }

  toString() {
    return `Season.${this.label}`;
  }
};

export const SEASONS = Object.keys(Season).map(season => Season[season]);

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