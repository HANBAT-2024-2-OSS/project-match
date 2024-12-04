import React from 'react';
import Calendar from '../components/Calendar';
import MatchTable from '../components/MatchTable';
import RankingTable from '../components/RankingTable';

const SportsPage = ({ sport }) => {
  return (
    <div>
      <h1>{sport === 'korea-soccer' ? '한국 축구' : '프리미어리그'} 일정 및 결과</h1>
      <Calendar sport={sport} />
      <h2>경기 일정 및 결과</h2>
      <MatchTable sport={sport} />
      <h2>순위표</h2>
      <RankingTable sport={sport} />
    </div>
  );
};

export default SportsPage;