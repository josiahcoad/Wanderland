import React from 'react';
import { Navbar, Glyphicon, Button } from 'react-bootstrap';
import './Navbar.css';

const pages = {
    FEEDBACK: 'FEEDBACK',
    RESULTS: 'RESULTS',
    ABOUT_US: 'ABOUTUS',
};

// decide what button to show on the navbar based on what page we're currently on
const renderNavButtons = setPage => (
    <span className="nav-buttons">
        <Button bsStyle="primary" onClick={() => setPage(pages.FEEDBACK)}>
            Feedback
        </Button>
        <Button bsStyle="primary" onClick={() => setPage(pages.ABOUT_US)}>
            About Us
        </Button>
        <Button bsStyle="primary" onClick={() => setPage(pages.RESULTS)}>
            Results
        </Button>
    </span>
);

const renderBrand = () => (
    <Navbar.Brand>
        <a
            href="https://github.com/josiahcoad/wanderland"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-brand"
        >
            <Glyphicon glyph="globe" />
            {' '}
Wanderland
        </a>
    </Navbar.Brand>
);

export default ({ setPage }) => (
    <Navbar>
        <Navbar.Header>{renderBrand()}</Navbar.Header>
        <Navbar.Form pullRight>{renderNavButtons(setPage)}</Navbar.Form>
    </Navbar>
);
