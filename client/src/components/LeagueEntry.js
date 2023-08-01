import React from "react";
import CurrentLeague from "./CurrentLeague";

export default function LeagueEntry({ league }) {
  const differenceInTime =
    new Date(league.starting_date) - new Date(league.end_date);

  let remainingDays;
  if (differenceInTime >= 0) {
    remainingDays = differenceInTime / (1000 * 3600 * 24);
  } else if (differenceInTime < 0) {
    remainingDays = 0;
  }

  return (
    <li>
      <h2>{league.league_name}</h2>
      <div>
        <button>Edit</button>
        <button>Delete</button>
      </div>
      <p>
        Start date: {league.starting_date} | End date: {league.end_date}
      </p>

      <p>Midway point: {league.midway_point}</p>
      <p>Number of groups in league: {league.league_events}</p>

      <h3>
        {remainingDays} left days for the {league.league_name}
      </h3>

      <button>Add event/group to {league.league_name}</button>
    </li>
  );
}
