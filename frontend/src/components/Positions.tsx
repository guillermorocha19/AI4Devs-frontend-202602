import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { POSITIONS_MOCK, PositionMock } from '../data/positionsMock';
import './Positions.css';

const STATUS_BADGE_CLASS: Record<PositionMock['status'], string> = {
  Abierto: 'position-card__badge--abierto',
  Contratado: 'position-card__badge--contratado',
  Cerrado: 'position-card__badge--cerrado',
  Borrador: 'position-card__badge--borrador',
};

const Positions: React.FC = () => {
  return (
    <Container className="mt-5 positions-page">
      <h2 className="text-center mb-4">Posiciones</h2>
      <div className="positions-filters">
        <Row>
          <Col xs={12} md={6} lg={3} className="positions-filters__field">
            <Form.Label htmlFor="filter-title" className="positions-filters__label">
              Título
            </Form.Label>
            <Form.Control
              id="filter-title"
              type="text"
              placeholder="Buscar por título"
            />
          </Col>
          <Col xs={12} md={6} lg={3} className="positions-filters__field">
            <Form.Label htmlFor="filter-date" className="positions-filters__label">
              Fecha
            </Form.Label>
            <Form.Control id="filter-date" type="date" placeholder="Buscar por fecha" />
          </Col>
          <Col xs={12} md={6} lg={3} className="positions-filters__field">
            <Form.Label htmlFor="filter-status" className="positions-filters__label">
              Estado
            </Form.Label>
            <Form.Control id="filter-status" as="select">
              <option value="">Estado</option>
              <option value="open">Abierto</option>
              <option value="filled">Contratado</option>
              <option value="closed">Cerrado</option>
              <option value="draft">Borrador</option>
            </Form.Control>
          </Col>
          <Col xs={12} md={6} lg={3} className="positions-filters__field">
            <Form.Label htmlFor="filter-manager" className="positions-filters__label">
              Manager
            </Form.Label>
            <Form.Control id="filter-manager" as="select">
              <option value="">Manager</option>
              <option value="john_doe">John Doe</option>
              <option value="jane_smith">Jane Smith</option>
            </Form.Control>
          </Col>
        </Row>
      </div>
      <Row className="positions-list g-4">
        {POSITIONS_MOCK.map((position) => (
          <Col xs={12} lg={6} key={position.id}>
            <Card className="position-card">
              <Card.Body>
                <Card.Title className="position-card__title">{position.title}</Card.Title>
                <Card.Text className="position-card__meta">
                  <strong>Manager:</strong> {position.manager}
                  <br />
                  <strong>Deadline:</strong> {position.deadline}
                </Card.Text>
                <span
                  className={`position-card__badge ${STATUS_BADGE_CLASS[position.status]}`}
                >
                  {position.status}
                </span>
                <div className="position-card__actions">
                  <Link
                    to={`/positions/${position.id}`}
                    state={{ title: position.title }}
                    className="btn btn-primary"
                  >
                    Ver proceso
                  </Link>
                  <Button variant="outline-secondary">Editar</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Positions;
