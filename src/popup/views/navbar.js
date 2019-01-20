import React from 'react';
import { Navbar, Glyphicon, Nav } from 'react-bootstrap';
import ActivateButton from './activateButton';
import './navbar.css';

const PopupNavbar = ({ onActivate, loading, error }) => (
    <Navbar>
        <Navbar.Header>
            <Navbar.Brand>
                <a
                    href="https://github.com/josiahcoad/seetheworld"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="navbar-brand"
                >
                    <Glyphicon glyph="globe" />
                    {' '}
See The World
                </a>
            </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Form pullRight>
            <ActivateButton bsStyle="primary" onClick={onActivate} loading={loading} error={error} />
        </Navbar.Form>
    </Navbar>
);

export default PopupNavbar;
