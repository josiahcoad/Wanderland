import React, { Component } from 'react';
import { NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap';
import uuid from 'uuid';
import CreateCollectionModal from './createCollectionModal';

class CollectionList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            collections: ['Nashville 2019', 'Coad Bros Japan', 'India 2018'],
            chosen: 'India 2018',
        };
        this.showModal = this.showModal.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.setChosen = this.setChosen.bind(this);
    }

    setChosen(collection) {
        this.setState({ chosen: collection });
    }

    showModal() {
        this.setState({ showModal: true });
    }

    submitForm(value) {
        this.setState(prevState => ({
            collections: [...prevState.collections, value],
        }));
        this.setState({ showModal: false });
        this.setState({ chosen: value });
    }

    render() {
        return (
            <>
                <CreateCollectionModal show={this.state.showModal} submitForm={this.submitForm} />
                <NavDropdown eventKey={3} title={this.state.chosen} id="basic-nav-dropdown">
                    {this.state.collections.map((collection, i) => (
                        <MenuItem
                            eventKey={i}
                            key={uuid.v4()}
                            onClick={() => this.setChosen(collection)}
                        >
                            {collection}
                        </MenuItem>
                    ))}
                    <MenuItem divider />
                    <MenuItem eventKey={3.3} onClick={this.showModal}>
                        <Glyphicon glyph="plus" />
                        {'   '}
                        Create New
                    </MenuItem>
                </NavDropdown>
            </>
        );
    }
}

export default CollectionList;
