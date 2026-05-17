import { API_BASE_URL } from '../constants/api';
import {
  ERROR_ACTUALIZAR_FASE,
  ERROR_CARGAR_DATOS,
} from '../constants/kanbanLabels';
import type { InterviewStep, PositionCandidate } from '../utils/kanbanUtils';

export type InterviewFlowResponse = {
  interviewFlow: {
    id: number;
    description: string;
    interviewSteps: InterviewStep[];
  };
};

export type UpdateStagePayload = {
  applicationId: number;
  currentInterviewStep: number;
};

/** Sin cabeceras personalizadas en GET: evita preflight CORS (204) y peticiones duplicadas. */
export const GET_FETCH_OPTIONS: RequestInit = {
  cache: 'no-store',
};

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (response.status === 304) {
    throw new Error(ERROR_CARGAR_DATOS);
  }
  if (!response.ok) {
    throw new Error(ERROR_CARGAR_DATOS);
  }
  return response.json() as Promise<T>;
};

type RawInterviewFlowPayload = {
  interviewFlow: {
    id?: number;
    description?: string;
    interviewSteps?: InterviewStep[];
    positionName?: string;
    interviewFlow?: {
      id: number;
      description: string;
      interviewSteps: InterviewStep[];
    };
  };
};

/** El controlador envuelve el resultado del servicio en `{ interviewFlow }` y duplica la clave. */
export const normalizeInterviewFlowResponse = (
  raw: RawInterviewFlowPayload
): InterviewFlowResponse => {
  const outer = raw.interviewFlow;

  if (Array.isArray(outer.interviewSteps)) {
    return {
      interviewFlow: {
        id: outer.id ?? 0,
        description: outer.description ?? '',
        interviewSteps: outer.interviewSteps,
      },
    };
  }

  const inner = outer.interviewFlow;
  if (inner && Array.isArray(inner.interviewSteps)) {
    return {
      interviewFlow: {
        id: inner.id,
        description: inner.description,
        interviewSteps: inner.interviewSteps,
      },
    };
  }

  throw new Error(ERROR_CARGAR_DATOS);
};

export const fetchInterviewFlow = async (
  positionId: number
): Promise<InterviewFlowResponse> => {
  const response = await fetch(
    `${API_BASE_URL}/position/${positionId}/interviewflow`,
    GET_FETCH_OPTIONS
  );
  const raw = await handleResponse<RawInterviewFlowPayload>(response);
  return normalizeInterviewFlowResponse(raw);
};

export const fetchCandidatesByPosition = async (
  positionId: number
): Promise<PositionCandidate[]> => {
  const response = await fetch(
    `${API_BASE_URL}/position/${positionId}/candidates`,
    GET_FETCH_OPTIONS
  );
  return handleResponse<PositionCandidate[]>(response);
};

export const updateCandidateStage = async (
  candidateId: number,
  payload: UpdateStagePayload
): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/candidates/${candidateId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(ERROR_ACTUALIZAR_FASE);
  }
};
