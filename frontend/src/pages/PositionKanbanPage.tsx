import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Alert, Container, Spinner } from 'react-bootstrap';
import PositionKanbanHeader from '../components/kanban/PositionKanbanHeader';
import KanbanBoard from '../components/kanban/KanbanBoard';
import {
  CARGANDO,
  ERROR_CARGAR_DATOS,
  ERROR_ID_POSICION_INVALIDO,
  STEP_NAME_ES,
  VOLVER,
} from '../constants/kanbanLabels';
import { getPositionTitleById } from '../data/positionsMock';
import {
  fetchCandidatesByPosition,
  fetchInterviewFlow,
} from '../services/positionService';
import {
  groupCandidatesByStepName,
  sortStepsByOrderIndex,
} from '../utils/kanbanUtils';
import type { InterviewStep, PositionCandidate } from '../utils/kanbanUtils';
import './PositionKanbanPage.css';

type LocationState = {
  title?: string;
};

const PositionKanbanPage: React.FC = () => {
  const { positionId: positionIdParam } = useParams<{ positionId: string }>();
  const location = useLocation();
  const state = location.state as LocationState | null;
  const loadGenerationRef = useRef(0);

  const positionId = useMemo(() => {
    const parsed = parseInt(positionIdParam ?? '', 10);
    return Number.isNaN(parsed) ? null : parsed;
  }, [positionIdParam]);

  const [steps, setSteps] = useState<InterviewStep[]>([]);
  const [groupedByStep, setGroupedByStep] = useState<
    Record<string, PositionCandidate[]>
  >({});
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const pageTitle =
    state?.title ??
    (positionId !== null ? getPositionTitleById(positionId) : undefined) ??
    'Posición';

  useEffect(() => {
    if (positionId === null) {
      setLoading(false);
      return;
    }

    const loadGeneration = ++loadGenerationRef.current;

    const loadKanbanData = async () => {
      setLoading(true);
      setLoadError(null);

      try {
        const [flowResponse, candidates] = await Promise.all([
          fetchInterviewFlow(positionId),
          fetchCandidatesByPosition(positionId),
        ]);

        if (loadGeneration !== loadGenerationRef.current) {
          return;
        }

        const orderedSteps = sortStepsByOrderIndex(
          flowResponse.interviewFlow.interviewSteps
        );
        const stepNames = orderedSteps.map((s) => s.name);

        setSteps(orderedSteps);
        setGroupedByStep(groupCandidatesByStepName(candidates, stepNames));
      } catch {
        if (loadGeneration !== loadGenerationRef.current) {
          return;
        }
        setLoadError(ERROR_CARGAR_DATOS);
      } finally {
        if (loadGeneration === loadGenerationRef.current) {
          setLoading(false);
        }
      }
    };

    loadKanbanData();

    return () => {
      loadGenerationRef.current += 1;
    };
  }, [positionId]);

  if (positionId === null) {
    return (
      <Container className="mt-5 position-kanban-page">
        <Alert variant="danger">{ERROR_ID_POSICION_INVALIDO}</Alert>
        <Link to="/positions" className="btn btn-secondary">
          {VOLVER}
        </Link>
      </Container>
    );
  }

  return (
    <Container className="mt-4 position-kanban-page">
      <PositionKanbanHeader title={pageTitle} />

      {loading && (
        <div className="text-center py-5" data-testid="kanban-loading">
          <Spinner animation="border" role="status" className="me-2" />
          <span>{CARGANDO}</span>
        </div>
      )}

      {!loading && loadError && (
        <>
          <Alert variant="danger">{loadError}</Alert>
          <Link to="/positions" className="btn btn-secondary">
            {VOLVER}
          </Link>
        </>
      )}

      {!loading && !loadError && (
        <KanbanBoard
          steps={steps}
          groupedByStep={groupedByStep}
          labelsMap={STEP_NAME_ES}
          onGroupedChange={setGroupedByStep}
        />
      )}
    </Container>
  );
};

export default PositionKanbanPage;
