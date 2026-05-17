import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { getStepDisplayName, sortCandidatesByScoreDesc } from '../../utils/kanbanUtils';
import type { PositionCandidate } from '../../utils/kanbanUtils';
import { getDragId } from '../../utils/kanbanDragUtils';
import CandidateCard from './CandidateCard';
import './KanbanColumn.css';

type KanbanColumnProps = {
  stepName: string;
  stepId: string;
  candidates: PositionCandidate[];
  labelsMap: Record<string, string>;
};

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  stepName,
  stepId,
  candidates,
  labelsMap,
}) => {
  const { setNodeRef, isOver } = useDroppable({ id: stepId });
  const sorted = sortCandidatesByScoreDesc(candidates);

  return (
    <section
      ref={setNodeRef}
      className={`kanban-column${isOver ? ' kanban-column--over' : ''}`}
      data-testid={`kanban-column-${stepName}`}
    >
      <h2 className="kanban-column__title">
        {getStepDisplayName(stepName, labelsMap)}
      </h2>
      <div className="kanban-column__cards">
        {sorted.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            fullName={candidate.fullName}
            averageScore={candidate.averageScore}
            dragId={getDragId(candidate.id)}
          />
        ))}
      </div>
    </section>
  );
};

export default KanbanColumn;
