import React from "react";
import { useEvents } from "../context/EventContext";

const RankingTable = ({ sport }) => {
  const { rankings } = useEvents();

  return (
    <table>
      <thead>
        <tr>
          <th>순위</th>
          <th>팀</th>
          <th>승점</th>
        </tr>
      </thead>
      <tbody>
        {rankings[sport]?.map((team, index) => (
          <tr key={team.team}>
            <td>{index + 1}</td>
            <td>{team.team}</td>
            <td>{team.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RankingTable;