import React, { useState } from "react";
import "./CustomMatchPage.css";

// 랜덤 팀 생성
const generateRandomTeams = (teamCount) => {
  const teams = Array.from({ length: teamCount }, (_, i) => `팀 ${i + 1}`);
  return teams.sort(() => Math.random() - 0.5); // 랜덤 정렬
};

// 리그전 경기 생성
const generateLeagueMatches = (teams) => {
  const matches = [];
  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      matches.push(`${teams[i]} vs ${teams[j]}`);
    }
  }
  return matches;
};

// 토너먼트 대진표 생성
const generateTournamentBracket = (teams) => {
  if (teams.length === 1) return [teams[0]];

  const nextRound = [];
  const bracket = [];

  for (let i = 0; i < teams.length; i += 2) {
    if (teams[i + 1]) {
      bracket.push(`${teams[i]} vs ${teams[i + 1]}`);
      nextRound.push(`승자(${teams[i]} vs ${teams[i + 1]})`);
    } else {
      nextRound.push(teams[i]);
    }
  }

  return [...bracket, ...generateTournamentBracket(nextRound)];
};

const CustomMatchPage = () => {
  const [teamCount, setTeamCount] = useState(4); // 기본 팀 수
  const [teams, setTeams] = useState([]); // 팀 리스트
  const [matches, setMatches] = useState([]); // 대진표
  const [mode, setMode] = useState("league"); // 경기 방식 (기본값: 리그전)

  // 대진표 생성 핸들러
  const handleGenerateMatches = () => {
    const randomizedTeams = generateRandomTeams(teamCount);
    setTeams(randomizedTeams); // teams를 업데이트

    if (mode === "league") {
      setMatches(generateLeagueMatches(randomizedTeams));
    } else if (mode === "tournament") {
      setMatches(generateTournamentBracket(randomizedTeams));
    }
  };

  return (
    <div className="custom-match-page">
      <h1>사설 경기 커스텀</h1>

      {/* 경기 설정 */}
      <div className="match-settings">
        <label>
          경기 방식:
          <select value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="league">리그전</option>
            <option value="tournament">토너먼트</option>
          </select>
        </label>
        <label>
          팀 수:
          <input
            type="number"
            min="2"
            max="128"
            value={teamCount}
            onChange={(e) => setTeamCount(Math.max(2, Math.min(128, Number(e.target.value))))}
          />
        </label>
        <button onClick={handleGenerateMatches}>대진표 생성</button>
      </div>

      {/* 팀 목록 */}
      <div className="teams-display">
        <h3>팀 목록</h3>
        <div className="teams">
          {teams.map((team, index) => (
            <div key={index} className="team">
              {team}
            </div>
          ))}
        </div>
      </div>

      {/* 대진표 표시 */}
      <div className="match-display">
        <h2>{mode === "league" ? "리그전 경기 목록" : "토너먼트 대진표"}</h2>
        <div className="matches">
          {matches.map((match, index) => (
            <div key={index} className="match">
              {match}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomMatchPage;
