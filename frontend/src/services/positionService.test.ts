import { API_BASE_URL } from '../constants/api';
import {
  GET_FETCH_OPTIONS,
  fetchInterviewFlow,
  fetchCandidatesByPosition,
  normalizeInterviewFlowResponse,
  updateCandidateStage,
} from './positionService';

describe('positionService', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('fetchInterviewFlow calls GET interviewflow', async () => {
    const mockFlow = {
      interviewFlow: {
        id: 1,
        description: 'Flow',
        interviewSteps: [],
      },
    };
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockFlow,
    });

    const result = await fetchInterviewFlow(1);

    expect(global.fetch).toHaveBeenCalledWith(
      `${API_BASE_URL}/position/1/interviewflow`,
      GET_FETCH_OPTIONS
    );
    expect(result).toEqual(mockFlow);
  });

  it('fetchCandidatesByPosition calls GET candidates', async () => {
    const mockCandidates = [
      {
        fullName: 'John Doe',
        currentInterviewStep: 'Technical Interview',
        averageScore: 4,
        id: 1,
        applicationId: 1,
      },
    ];
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockCandidates,
    });

    const result = await fetchCandidatesByPosition(2);

    expect(global.fetch).toHaveBeenCalledWith(
      `${API_BASE_URL}/position/2/candidates`,
      GET_FETCH_OPTIONS
    );
    expect(result).toEqual(mockCandidates);
  });

  it('updateCandidateStage sends PUT with body', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ message: 'ok' }),
    });

    await updateCandidateStage(5, {
      applicationId: 10,
      currentInterviewStep: 3,
    });

    expect(global.fetch).toHaveBeenCalledWith(
      `${API_BASE_URL}/candidates/5`,
      expect.objectContaining({
        method: 'PUT',
        cache: 'no-store',
        body: JSON.stringify({
          applicationId: 10,
          currentInterviewStep: 3,
        }),
      })
    );
  });

  it('throws Spanish error when fetch fails', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
    });

    await expect(fetchInterviewFlow(1)).rejects.toThrow(
      'No se pudieron cargar los datos del proceso'
    );
  });

  it('normalizeInterviewFlowResponse handles nested backend shape', () => {
    const normalized = normalizeInterviewFlowResponse({
      interviewFlow: {
        positionName: 'Senior Full-Stack Engineer',
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
      },
    });

    expect(normalized.interviewFlow.interviewSteps).toHaveLength(1);
    expect(normalized.interviewFlow.interviewSteps[0].name).toBe(
      'Initial Screening'
    );
  });

  it('throws when response is 304 Not Modified', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 304,
      json: async () => ({}),
    });

    await expect(fetchInterviewFlow(1)).rejects.toThrow(
      'No se pudieron cargar los datos del proceso'
    );
  });
});
