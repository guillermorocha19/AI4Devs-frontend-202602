import React from 'react';
import { render, screen } from '@testing-library/react';
import { DndContext } from '@dnd-kit/core';
import CandidateCard from './CandidateCard';
import { SIN_PUNTUACION } from '../../constants/kanbanLabels';

const wrap = (ui: React.ReactElement) =>
  render(<DndContext>{ui}</DndContext>);

describe('CandidateCard', () => {
  it('shows candidate full name', () => {
    wrap(
      <CandidateCard
        fullName="John Doe"
        averageScore={4}
        dragId="candidate-1"
      />
    );
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('shows truncated score as green dots', () => {
    const { container } = wrap(
      <CandidateCard
        fullName="Jane"
        averageScore={4.7}
        dragId="candidate-2"
      />
    );
    expect(container.querySelectorAll('.score-dot')).toHaveLength(4);
  });

  it('shows Sin puntuación when averageScore is zero', () => {
    const { container } = wrap(
      <CandidateCard
        fullName="Carlos García"
        averageScore={0}
        dragId="candidate-3"
      />
    );
    expect(screen.getByText(SIN_PUNTUACION)).toBeInTheDocument();
    expect(container.querySelectorAll('.score-dot')).toHaveLength(0);
  });

  it('exposes data-testid for drag target', () => {
    wrap(
      <CandidateCard
        fullName="Jane"
        averageScore={3}
        dragId="candidate-2"
      />
    );
    expect(screen.getByTestId('candidate-card-candidate-2')).toBeInTheDocument();
  });
});
