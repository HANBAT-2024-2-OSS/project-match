import React from 'react';

const MatchBracket = ({ matchType, teams }) => {
  const renderBracket = () => {
    if (matchType === 'league') {
      return (
        <div>
          <h3>리그전 대진표</h3>
          <ul>
            {teams.map((team, index) => (
              <li key={index}>{team}</li>
            ))}
          </ul>
        </div>
      );
    }

    if (matchType === 'tournament') {
      return (
        <div>
          <h3>토너먼트 대진표</h3>
          <ul>
            {teams.map((team, index) => (
              <li key={index}>{team}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return <div>{renderBracket()}</div>;
};

export default MatchBracket;
