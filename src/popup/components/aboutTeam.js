import React from 'react';
import { PanelGroup } from 'react-bootstrap';
import AboutPerson from './aboutPerson';
import people from './people.json';
import './aboutTeam.css';

const AboutTeam = () => (
    <PanelGroup className="about-team">
        {people.map(person => (
            <AboutPerson person={person} />
        ))}
    </PanelGroup>
);

export default AboutTeam;
