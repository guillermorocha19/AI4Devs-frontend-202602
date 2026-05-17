import React from 'react';
import './ScoreDots.css';

type ScoreDotsProps = {
  count: number;
};

const ScoreDots: React.FC<ScoreDotsProps> = ({ count }) => {
  if (count <= 0) {
    return null;
  }

  return (
    <div className="score-dots" aria-label={`Puntuación: ${count}`}>
      {Array.from({ length: count }, (_, index) => (
        <span key={index} className="score-dot" aria-hidden="true" />
      ))}
    </div>
  );
};

export default ScoreDots;
