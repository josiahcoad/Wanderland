import React from 'react';
import { Navbar, Glyphicon } from 'react-bootstrap';
import './tooltipNavbar.css';

const PopupNavbar = () => (
    <Navbar>
        <Navbar.Header>
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
        </Navbar.Header>
        <Navbar.Form pullRight>
        </Navbar.Form>
    </Navbar>
);

export default PopupNavbar;
