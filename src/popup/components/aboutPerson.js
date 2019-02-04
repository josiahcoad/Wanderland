import React from 'react';
import { Grid, Col, Panel } from 'react-bootstrap';
import { SocialIcon } from 'react-social-icons';
import './aboutPerson.css';

const AboutPerson = () => (
    <Panel className="about-person">
        <Panel.Heading>
            <Panel.Title>Josiah Coad</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
            <Grid>
                <Col xs={4}>
                    <img
                        src="../images/josiah.jpg"
                        alt="avatar"
                        className="profile-picture center-block"
                    />
                    <div className="social-container">
                        <SocialIcon url="https://www.facebook.com/josiah.coad" />
                        <SocialIcon url="http://github.com/josiahcoad" />
                        <SocialIcon url="http://linkedin.com/in/josiahcoad" />
                    </div>
                </Col>
                <Col xs={9}>
                    <ul>
                        <li>
                            <strong>Major: </strong>
                            Computer Science and Applied Math (Graduating May 2020)
                        </li>
                        <li>
                            <strong>Interests: </strong>
                            Startups, Machine Learning Engineering, Teaching
                        </li>
                    </ul>
                </Col>
            </Grid>
        </Panel.Body>
    </Panel>
);

export default AboutPerson;
