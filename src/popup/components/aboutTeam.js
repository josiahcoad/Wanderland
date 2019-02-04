import React from 'react';
import { PanelGroup } from 'react-bootstrap';
import AboutPerson from './aboutPerson';

const AboutTeam = () => (
    <PanelGroup className="about-team">
        <AboutPerson />
        <AboutPerson />
        <AboutPerson />
        <AboutPerson />
        <AboutPerson />
    </PanelGroup>
);

export default AboutTeam;
