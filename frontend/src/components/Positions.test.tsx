import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Positions from './Positions';

describe('Positions', () => {
  it('links Ver proceso to kanban route with title state', () => {
    render(
      <MemoryRouter>
        <Positions />
      </MemoryRouter>
    );

    const verProceso = screen.getAllByRole('link', { name: /ver proceso/i });
    expect(verProceso[0]).toHaveAttribute('href', '/positions/1');
  });
});
