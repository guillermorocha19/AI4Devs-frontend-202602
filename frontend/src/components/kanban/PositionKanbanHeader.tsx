import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'react-bootstrap-icons';
import { VOLVER_POSICIONES } from '../../constants/kanbanLabels';
import './PositionKanbanHeader.css';

type PositionKanbanHeaderProps = {
  title: string;
};

const PositionKanbanHeader: React.FC<PositionKanbanHeaderProps> = ({ title }) => (
  <header className="position-kanban-header">
    <Link
      to="/positions"
      className="position-kanban-header__back"
      aria-label={VOLVER_POSICIONES}
    >
      <ArrowLeft size={28} aria-hidden="true" />
    </Link>
    <h1 className="position-kanban-header__title">{title}</h1>
  </header>
);

export default PositionKanbanHeader;
