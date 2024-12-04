import React, { useState } from 'react';

const MatchControls = ({ onGenerateBracket }) => {
  const [matchType, setMatchType] = useState('league');
  const [teamCount, setTeamCount] = useState(0);

  const handleGenerate = () => {
    if (teamCount < 2 || teamCount > 128) {
      alert('팀 수는 2에서 128 사이여야 합니다.');
      return;
    }
    onGenerateBracket(matchType, teamCount);
  };

  return (
    <div>
      <h3>경기 설정</h3>
      <label>
        경기 방식:
        <select value={matchType} onChange={(e) => setMatchType(e.target.value)}>
          <option value="league">리그전</option>
          <option value="tournament">토너먼트</option>
        </select>
      </label>
      <label>
        팀 수:
        <input
          type="number"
          value={teamCount}
          onChange={(e) => setTeamCount(Number(e.target.value))}
          min="2"
          max="128"
        />
      </label>
      <button onClick={handleGenerate}>대진표 생성</button>
    </div>
  );
};

export default MatchControls;