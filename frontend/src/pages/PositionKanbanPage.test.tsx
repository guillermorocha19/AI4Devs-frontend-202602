import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PositionKanbanPage from './PositionKanbanPage';
import * as positionService from '../services/positionService';

jest.mock('../services/positionService');

const mockFlow = {
  interviewFlow: {
    id: 1,
    description: 'Flow',
    interviewSteps: [
      {
        id: 1,
        name: 'Initial Screening',
        orderIndex: 1,
        interviewFlowId: 1,
        interviewTypeId: 1,
      },
    ],
  },
};

const mockCandidates = [
  {
    fullName: 'John Doe',
    currentInterviewStep: 'Initial Screening',
    averageScore: 4,
    id: 1,
    applicationId: 1,
  },
];

const renderPage = (path: string, state?: { title?: string }) =>
  render(
    <MemoryRouter initialEntries={[{ pathname: path, state }]}>
      <Routes>
        <Route path="/positions/:positionId" element={<PositionKanbanPage />} />
      </Routes>
    </MemoryRouter>
  );

describe('PositionKanbanPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (positionService.fetchInterviewFlow as jest.Mock).mockResolvedValue(mockFlow);
    (positionService.fetchCandidatesByPosition as jest.Mock).mockResolvedValue(
      mockCandidates
    );
  });

  it('shows error for invalid position id', () => {
    renderPage('/positions/abc');
    expect(
      screen.getByText(/identificador de posición no válido/i)
    ).toBeInTheDocument();
  });

  it('shows title from router state', async () => {
    renderPage('/positions/1', { title: 'Título desde state' });
    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Título desde state'
      );
    });
  });

  it('falls back to mock title when state is missing', async () => {
    renderPage('/positions/1');
    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Senior Full-Stack Engineer'
      );
    });
  });

  it('shows loading then kanban board', async () => {
    renderPage('/positions/1', { title: 'Test' });
    expect(screen.getByTestId('kanban-loading')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId('kanban-board')).toBeInTheDocument();
    });
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('shows error alert when fetch fails', async () => {
    (positionService.fetchInterviewFlow as jest.Mock).mockRejectedValue(
      new Error('fail')
    );
    (positionService.fetchCandidatesByPosition as jest.Mock).mockRejectedValue(
      new Error('fail')
    );
    renderPage('/positions/1', { title: 'Test' });
    await waitFor(
      () => {
        expect(
          screen.getByText(/no se pudieron cargar los datos/i)
        ).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
});
