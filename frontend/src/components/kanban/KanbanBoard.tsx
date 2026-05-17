import React, { useCallback, useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { Alert } from 'react-bootstrap';
import { ERROR_ACTUALIZAR_FASE } from '../../constants/kanbanLabels';
import { updateCandidateStage } from '../../services/positionService';
import type { InterviewStep, PositionCandidate } from '../../utils/kanbanUtils';
import { sortStepsByOrderIndex } from '../../utils/kanbanUtils';
import {
  findCandidateStepName,
  findStepByDropId,
  getStepDropId,
  moveCandidateToStep,
  parseDragId,
} from '../../utils/kanbanDragUtils';
import KanbanColumn from './KanbanColumn';
import './KanbanBoard.css';

type KanbanBoardProps = {
  steps: InterviewStep[];
  groupedByStep: Record<string, PositionCandidate[]>;
  labelsMap: Record<string, string>;
  onGroupedChange: (grouped: Record<string, PositionCandidate[]>) => void;
};

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  steps,
  groupedByStep,
  labelsMap,
  onGroupedChange,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const sortedSteps = sortStepsByOrderIndex(steps);

  const handleDragEnd = useCallback(
    async (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over) {
        return;
      }

      const candidateId = parseDragId(String(active.id));
      const targetStep = findStepByDropId(String(over.id), steps);
      if (candidateId === undefined || !targetStep) {
        return;
      }

      const fromStepName = findCandidateStepName(candidateId, groupedByStep);
      if (!fromStepName) {
        return;
      }

      const candidate = groupedByStep[fromStepName].find(
        (c) => c.id === candidateId
      );
      if (!candidate) {
        return;
      }

      if (fromStepName === targetStep.name) {
        return;
      }

      const previousGrouped = groupedByStep;
      const optimisticGrouped = moveCandidateToStep(
        groupedByStep,
        candidateId,
        fromStepName,
        targetStep.name
      );
      onGroupedChange(optimisticGrouped);
      setErrorMessage(null);

      try {
        await updateCandidateStage(candidateId, {
          applicationId: candidate.applicationId,
          currentInterviewStep: targetStep.id,
        });
      } catch (error) {
        onGroupedChange(previousGrouped);
        setErrorMessage(
          error instanceof Error ? error.message : ERROR_ACTUALIZAR_FASE
        );
      }
    },
    [groupedByStep, onGroupedChange, steps]
  );

  return (
    <div className="kanban-board-wrapper">
      {errorMessage && (
        <Alert
          variant="danger"
          dismissible
          onClose={() => setErrorMessage(null)}
          className="mb-3"
        >
          {errorMessage}
        </Alert>
      )}
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="kanban-board" data-testid="kanban-board">
          {sortedSteps.map((step) => (
            <KanbanColumn
              key={step.id}
              stepName={step.name}
              stepId={getStepDropId(step.id)}
              candidates={groupedByStep[step.name] ?? []}
              labelsMap={labelsMap}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
};

export default KanbanBoard;
