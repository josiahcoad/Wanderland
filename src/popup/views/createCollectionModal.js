import React, { Component } from 'react';
import {
    Modal, FormGroup, ControlLabel, FormControl, Button,
} from 'react-bootstrap';

class CreateCollectionModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    render() {
        return (
            this.props.show && (
                <div className="static-modal">
                    <Modal.Dialog>
                        <Modal.Header>
                            <Modal.Title>Name Your New Collection</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <FormGroup controlId="formBasicText">
                                    <FormControl
                                        type="text"
                                        value={this.state.value}
                                        placeholder="Enter name"
                                        onChange={this.handleChange}
                                    />
                                </FormGroup>
                            </form>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button
                                bsStyle="primary"
                                onClick={() => this.props.submitForm(this.state.value)}
                            >
                                Add
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </div>
            )
        );
    }
}

export default CreateCollectionModal;
