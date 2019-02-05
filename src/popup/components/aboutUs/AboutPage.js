import React from 'react';
import { PanelGroup } from 'react-bootstrap';
import uuid from 'uuid';
import AboutPerson from './AboutPerson';
import people from './people.json';
import './AboutPage.css';
import '../../images/amir.jpg';
import '../../images/josiah.jpg';
import '../../images/andrew.jpg';
import '../../images/chinmay.jpg';
import '../../images/sorhan.jpg';

const AboutTeam = () => (
    <PanelGroup className="about-page popup-page" generateChildId>
        {people.map(person => (
            <AboutPerson key={uuid.v4()} person={person} />
        ))}
    </PanelGroup>
);

export default AboutTeam;
