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
    return 'Activate Page';
}

const ActivateButton = ({ loading, error, onClick }) => (
    <Button onClick={onClick} color="primary" disabled={loading || error}>
        {getButtonText(loading, error)}
    </Button>
);

export default ActivateButton;
