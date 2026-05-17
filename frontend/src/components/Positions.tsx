import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { POSITIONS_MOCK } from '../data/positionsMock';

const Positions: React.FC = () => {
  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Posiciones</h2>
      <Row className="mb-4">
        <Col md={3}>
          <Form.Control type="text" placeholder="Buscar por título" />
        </Col>
        <Col md={3}>
          <Form.Control type="date" placeholder="Buscar por fecha" />
        </Col>
        <Col md={3}>
          <Form.Control as="select">
            <option value="">Estado</option>
            <option value="open">Abierto</option>
            <option value="filled">Contratado</option>
            <option value="closed">Cerrado</option>
            <option value="draft">Borrador</option>
          </Form.Control>
        </Col>
        <Col md={3}>
          <Form.Control as="select">
            <option value="">Manager</option>
            <option value="john_doe">John Doe</option>
            <option value="jane_smith">Jane Smith</option>
          </Form.Control>
        </Col>
      </Row>
      <Row>
        {POSITIONS_MOCK.map((position) => (
          <Col md={6} key={position.id} className="mb-4">
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>{position.title}</Card.Title>
                <Card.Text>
                  <strong>Manager:</strong> {position.manager}
                  <br />
                  <strong>Deadline:</strong> {position.deadline}
                </Card.Text>
                <span
                  className={`badge ${
                    position.status === 'Abierto'
                      ? 'bg-warning'
                      : position.status === 'Contratado'
                        ? 'bg-success'
                        : 'bg-secondary'
                  } text-white`}
                >
                  {position.status}
                </span>
                <div className="d-flex justify-content-between mt-3">
                  <Link
                    to={`/positions/${position.id}`}
                    state={{ title: position.title }}
                    className="btn btn-primary"
                  >
                    Ver proceso
                  </Link>
                  <Button variant="secondary">Editar</Button>
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
