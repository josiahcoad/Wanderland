import React, { Component } from 'react';
import Popover from 'react-popover';
import $ from 'jquery';
import TooltipNavbar from './TooltipNavbar';
import './Tooltip.css';
import ContentCarousel from './ContentCarousel';

const PlacePopover = ({ name }) => (
    <div className="wanderland-popover">
        <TooltipNavbar />
        <div className="wl-content">
            <ContentCarousel name={name} />
        </div>
    </div>
);

class Tooltip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        };
        this.setShow = this.setShow.bind(this);
        this.toggleShow = this.toggleShow.bind(this);
        this.mouseLeft = this.mouseLeft.bind(this);
    }

    setShow(state) {
        this.setState({ show: state });
    }

    toggleShow() {
        this.setState(prevState => ({ show: !prevState.show }));
    }

    mouseLeft() {
        // Give the user 300 ms to move from the anchor text to the Popover.
        setTimeout(() => {
            if ($('.Popover:hover').length === 0) {
                this.setShow(false);
            }
        }, 300);
        // If the user leaves the popover, it may have been by accident.
        // Give them 300 ms to move back over the popover.
        $('.Popover').on('mouseleave', () => {
            setTimeout(() => {
                if ($('.Popover:hover').length === 0) {
                    this.setShow(false);
                }
            }, 300);
        });
    }

    render() {
        return (
            <Popover
                isOpen={this.state.show}
                body={<PlacePopover name={this.props.place.name} />}
                onOuterAction={() => this.setShow(false)}
                place="below"
                tipSize={0.01}
            >
                <button
                    type="button"
                    className="anchor-like-button"
                    onMouseEnter={this.toggleShow}
                    onMouseLeave={this.mouseLeft}
                >
                    {this.props.place.name}
                </button>
            </Popover>
        );
    }
}

export default Tooltip;
