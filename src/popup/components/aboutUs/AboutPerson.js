import React from 'react';
import { Grid, Col, Panel } from 'react-bootstrap';
import { SocialIcon } from 'react-social-icons';
import './AboutPerson.css';

const AboutPerson = ({ person }) => (
    <Panel className="about-person">
        <Panel.Heading>
            <Panel.Title>{person.name}</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
            <Grid>
                <Col xs={1}>
                    <div className="social-container">
                        <SocialIcon url={person.fblink} />
                        <SocialIcon url={person.LinkedIn} />
                        <SocialIcon url={person.Github} />
                    </div>
                </Col>
                <Col xs={3}>
                    <img
                        src={`../images/${person.image}`}
                        alt="avatar"
                        className="profile-picture center-block"
                    />
                </Col>
                <Col xs={8}>
                    <ul className="person-description">
                        <li>
                            <strong>School: </strong>
                            {person.school}
                        </li>
                        <li>
                            <strong>Major: </strong>
                            {person.major}
                        </li>
                        <li>
                            <strong>Interests: </strong>
                            {person.interest}
                        </li>
                        <li>
                            <strong>Favorite Place to Visit: </strong>
                            {person.favoritePlace}
                        </li>
                        <li>
                            <strong>Favorite Quote: </strong>
                            <i>{person.quote}</i>
                        </li>
                    </ul>
                </Col>
            </Grid>
        </Panel.Body>
    </Panel>
);

export default AboutPerson;
