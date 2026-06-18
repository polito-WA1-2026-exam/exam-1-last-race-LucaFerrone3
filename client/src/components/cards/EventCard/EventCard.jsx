import './EventCard.css';
import { Container, Row, Col } from 'react-bootstrap';

function EventCard({ points, description }) {

    return <>
        <Container fluid className="event-card shadow">
            <Row className="align-items-center h-100 my-3">
                <Col xs="auto">
                    <p className="mb-0 ms-3 custom-text fw-bold">
                        {points}
                    </p>
                </Col>

                <Col>
                    <p className="mb-0 custom-text text-center">
                        {description}
                    </p>
                </Col>
            </Row>
        </Container>
    </>;
}

export default EventCard;