import React from 'react';
import { Navbar, Glyphicon, Button } from 'react-bootstrap';
import './navbar.css';

function getButtonText(loading, error) {
    if (loading) {
        return 'Loading...';
    }
    if (error) {
        return 'Please Refresh';
    }
    return 'Scan Page';
}

const PopupNavbar = ({
    onActivate, loading, error, toggleShowFeedbackForm, showFeedbackForm,
}) => (
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
            {!showFeedbackForm && (
                <Button
                    bsStyle="primary"
                    onClick={onActivate}
                    disabled={loading || error}
                    className="activate-button"
                >
                    {getButtonText(loading, error)}
                </Button>
            )}
        </Navbar.Form>
        <Navbar.Form pullRight>
            {showFeedbackForm ? (
                <Button bsStyle="primary" onClick={toggleShowFeedbackForm}>
                    Hide Feedback
                </Button>
            ) : (
                <Button bsStyle="primary" onClick={toggleShowFeedbackForm}>
                    Give Feedback
                </Button>
            )}
        </Navbar.Form>
    </Navbar>
);

export default PopupNavbar;
