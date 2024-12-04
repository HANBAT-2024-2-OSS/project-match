import React from 'react';

const MatchTable = ({ sport }) => {
  const matches = []; // Fetch logic 필요

  return (
    <table>
      <thead>
        <tr>
          <th>날짜</th>
          <th>팀 1</th>
          <th>팀 2</th>
          <th>결과</th>
        </tr>
      </thead>
      <tbody>
        {matches.map((match, index) => (
          <tr key={index}>
            <td>{match.date}</td>
            <td>{match.team1}</td>
            <td>{match.team2}</td>
            <td>{match.result}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MatchTable;