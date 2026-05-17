import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { SIN_PUNTUACION } from '../../constants/kanbanLabels';
import { scoreToDotCount } from '../../utils/kanbanUtils';
import ScoreDots from './ScoreDots';
import './CandidateCard.css';

type CandidateCardProps = {
  fullName: string;
  averageScore: number;
  dragId: string;
};

const CandidateCard: React.FC<CandidateCardProps> = ({
  fullName,
  averageScore,
  dragId,
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: dragId });

  const dotCount = scoreToDotCount(averageScore);
  const scoreLabel =
    dotCount > 0 ? `Puntuación: ${dotCount}` : SIN_PUNTUACION;

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="candidate-card"
      data-testid={`candidate-card-${dragId}`}
      {...listeners}
      {...attributes}
    >
      <div className="candidate-card__name">{fullName}</div>
      <div className="candidate-card__score" aria-label={scoreLabel}>
        {dotCount > 0 ? (
          <ScoreDots count={dotCount} />
        ) : (
          <span className="candidate-card__no-score">{SIN_PUNTUACION}</span>
        )}
      </div>
    </div>
  );
};

export default CandidateCard;
