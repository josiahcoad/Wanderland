import React from 'react';
import './activateButton.css';
import { Button } from 'react-bootstrap';

function getButtonText(loading, error) {
    if (loading) {
        return 'Loading...';
    }
    if (error) {
        return 'Please Refresh';
    }
    return 'Scrape Page';
}

const ActivateButton = ({ loading, error, onClick }) => (
    <Button onClick={onClick} disabled={loading || error} className="activate-button">
        {getButtonText(loading, error)}
    </Button>
);

export default ActivateButton;
