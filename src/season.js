import { useState } from "react";
import { isBirthday } from "./util";

// https://masteringjs.io/tutorials/fundamentals/enum
export class Season {
  static SPRING = new Season('Spring', 'SPRING', isBirthday ? '🎂' : '🌱');
  static SUMMER = new Season('Summer', 'SUMMER', isBirthday ? '🎊' : '🌞');
  static FALL = new Season('Autumn', 'FALL', isBirthday ? '🎁' : '🍂');
  static WINTER = new Season('Winter', 'WINTER', isBirthday ? '🎉' : '❄️');

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
      {SEASONS.map(({ label, graphqlEnum, emoji }) => {
        const id = `season-${graphqlEnum}`;
        return (
          <div className="list-item" key={id}>
            <input
              type="checkbox"
              id={id}
              name="seasons"
              value={graphqlEnum}
              onChange={(e) => handleCheckChange(e.target.checked)}
              // Setting required conditionally here is an easy way to use default
              // validations to ensure at least one is checked
              required={numChecked === 0}
            />
            <label htmlFor={id}>{`${emoji} ${label}`}</label>
          </div>
        );
      })}
    </fieldset>
  );
};