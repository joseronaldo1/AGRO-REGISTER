import React from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';
import '../../styles/Servicies.css';

const servicesData = [
    {
        title: <strong>¿Qué es AGRO-REGISTER?</strong>,
        description: 'AGRO-REGISTER es una plataforma innovadora. Se busca proporcionar una solución integral que permita a los agricultores monitorear de manera eficiente las tareas llevadas a cabo en sus cultivos, garantizando un seguimiento preciso del progreso, el uso adecuado de recursos y la gestión de la nómina de los trabajadores.',
    },
    {
        title: <strong>¿Cuál es nuestro propósito?</strong>,
        description: 'Nuestro propósito es proporcionar a los administradores de fincas un control integral sobre todas las operaciones agrícolas. Esto incluye registrar de manera eficiente las actividades diarias, gestionar de manera efectiva el inventario de cultivos y recursos, y mantener un seguimiento preciso de los ingresos y gastos de la finca.',
    },
    {
        title: <strong>Desarrolladores</strong>,
        description: <strong>Nuestro equipo de desarrolladores:</strong>,
        developers: ['Ronaldo Ledezma Parra', 'Esteban Alejandro Gaviria Murcia', 'Sergio Canacue España', 'Kevin Fernando Mahecha', 'Pablo Andres Perdomo'],
    },
    // Agrega más objetos aquí para cada servicio adicional
];

const Services = () => {
    return (
        <Container className="my-5 container-border-green">
            <h3 className="text-center mb-5">AGRO REGISTER</h3>
            <Row>
                {servicesData.map((service, index) => (
                    <Col md={4} className="mb-4" key={index} style={{ fontFamily: 'unset' }}>
                        <Card className="h-100 servicio-card">
                            <Card.Body>
                                <div className="d-flex justify-content-center mb-3">
                                    <i className="fa-solid fa-code fa-3x"></i>
                                </div>
                                <Card.Title className="text-center">{service.title}</Card.Title>
                                <Card.Text style={{ fontFamily: 'serif' }}>
                                    {service.description}
                                    {service.developers && (
                                        <ul className="list-unstyled">
                                            {service.developers.map((developer, index) => (
                                                <li key={index} style={{ marginBottom: '12px', fontFamily: 'serif' }}>{developer}</li>
                                            ))}
                                        </ul>
                                    )}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Services;
