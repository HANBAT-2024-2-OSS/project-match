import React from "react";
import "./RankingTable.css";

const RankingTable = ({ events }) => {
  const calculateRankings = () => {
    const teams = {};

    Object.values(events).forEach((event) => {
      if (!event.result) return;
      const [teamA, scoreA, teamB, scoreB] = event.result.split(" ");

      if (!teams[teamA]) teams[teamA] = { points: 0 };
      if (!teams[teamB]) teams[teamB] = { points: 0 };

      if (parseInt(scoreA) > parseInt(scoreB)) teams[teamA].points += 3;
      else if (parseInt(scoreA) < parseInt(scoreB)) teams[teamB].points += 3;
      else {
        teams[teamA].points += 1;
        teams[teamB].points += 1;
      }
    });

    return Object.entries(teams)
      .map(([team, data]) => ({ team, ...data }))
      .sort((a, b) => b.points - a.points);
  };

  const rankings = calculateRankings();

  return (
    <div className="ranking-table">
      <h2>순위표</h2>
      <table>
        <thead>
          <tr>
            <th>순위</th>
            <th>팀</th>
            <th>승점</th>
          </tr>
        </thead>
        <tbody>
          {rankings.map((team, index) => (
            <tr key={team.team}>
              <td>{index + 1}</td>
              <td>{team.team}</td>
              <td>{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RankingTable;
