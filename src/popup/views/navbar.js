import React from 'react';
import { Navbar, Glyphicon } from 'react-bootstrap';
import ActivateButton from './activateButton';

const PopupNavbar = ({ onActivate, loading, error }) => (
    <Navbar>
        <Navbar.Header>
            <Navbar.Brand>
                <a
                    href="https://github.com/josiahcoad/seetheworld"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Glyphicon glyph="globe" />
                    {' '}
                    See The World
                </a>
            </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Form pullRight>
            <ActivateButton
                bsStyle="primary"
                onClick={onActivate}
                loading={loading}
                error={error}
            >
                Activate Page
            </ActivateButton>
        </Navbar.Form>
    </Navbar>
);

export default PopupNavbar;
