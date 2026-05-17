import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PositionKanbanHeader from './PositionKanbanHeader';

describe('PositionKanbanHeader', () => {
  it('shows position title', () => {
    render(
      <MemoryRouter>
        <PositionKanbanHeader title="Senior Full-Stack Engineer" />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Senior Full-Stack Engineer'
    );
  });

  it('back link points to positions list', () => {
    render(
      <MemoryRouter>
        <PositionKanbanHeader title="Test" />
      </MemoryRouter>
    );
    const link = screen.getByRole('link', { name: /volver/i });
    expect(link).toHaveAttribute('href', '/positions');
  });
});
