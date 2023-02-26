import { useState } from "react";

// https://masteringjs.io/tutorials/fundamentals/enum
export class Season {
  static SPRING = new Season('Spring', 'SPRING', '🌱');
  static SUMMER = new Season('Summer', 'SUMMER', '🌞');
  static FALL = new Season('Autumn', 'FALL', '🍂');
  static WINTER = new Season('Winter', 'WINTER', '❄️');

  constructor(label, graphqlEnum, emoji) {
    this.label = label;
    this.graphqlEnum = graphqlEnum;
    this.emoji = emoji;
  }

  toString() {
    return `Season.${this.graphqlEnum}`;
  }
};

export const SEASONS = Object.values(Season);

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