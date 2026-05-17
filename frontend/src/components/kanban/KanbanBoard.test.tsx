import React from 'react';
import { render, screen } from '@testing-library/react';
import KanbanBoard from './KanbanBoard';
import { STEP_NAME_ES } from '../../constants/kanbanLabels';

jest.mock('../../services/positionService', () => ({
  updateCandidateStage: jest.fn(),
}));

const steps = [
  { id: 1, name: 'Initial Screening', orderIndex: 1, interviewFlowId: 1, interviewTypeId: 1 },
  { id: 2, name: 'Technical Interview', orderIndex: 2, interviewFlowId: 1, interviewTypeId: 2 },
];

const grouped = {
  'Initial Screening': [
    {
      fullName: 'John Doe',
      averageScore: 4,
      currentInterviewStep: 'Initial Screening',
      id: 10,
      applicationId: 100,
    },
  ],
  'Technical Interview': [],
};

describe('KanbanBoard', () => {
  it('renders a column per step in order', () => {
    render(
      <KanbanBoard
        steps={steps}
        groupedByStep={grouped}
        labelsMap={STEP_NAME_ES}
        onGroupedChange={jest.fn()}
      />
    );
    expect(screen.getByText('Llamada inicial')).toBeInTheDocument();
    expect(screen.getByText('Entrevista técnica')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});
