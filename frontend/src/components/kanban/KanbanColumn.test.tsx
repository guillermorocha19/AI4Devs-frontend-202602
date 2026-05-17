import React from 'react';
import { render, screen } from '@testing-library/react';
import { DndContext } from '@dnd-kit/core';
import KanbanColumn from './KanbanColumn';
import { STEP_NAME_ES } from '../../constants/kanbanLabels';

const wrap = (ui: React.ReactElement) =>
  render(<DndContext>{ui}</DndContext>);

describe('KanbanColumn', () => {
  const candidates = [
    {
      fullName: 'High Score',
      averageScore: 5,
      currentInterviewStep: 'Technical Interview',
      id: 1,
      applicationId: 1,
    },
    {
      fullName: 'Low Score',
      averageScore: 2,
      currentInterviewStep: 'Technical Interview',
      id: 2,
      applicationId: 2,
    },
  ];

  it('shows Spanish column title', () => {
    wrap(
      <KanbanColumn
        stepName="Technical Interview"
        stepId="step-20"
        candidates={candidates}
        labelsMap={STEP_NAME_ES}
      />
    );
    expect(screen.getByText('Entrevista técnica')).toBeInTheDocument();
  });

  it('renders candidates sorted by score desc', () => {
    wrap(
      <KanbanColumn
        stepName="Technical Interview"
        stepId="step-20"
        candidates={candidates}
        labelsMap={STEP_NAME_ES}
      />
    );
    const names = screen.getAllByText(/Score/);
    expect(names[0]).toHaveTextContent('High Score');
  });
});
