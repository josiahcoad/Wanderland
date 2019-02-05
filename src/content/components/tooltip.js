import React, { Component } from 'react';
import Popover from 'react-popover';
import $ from 'jquery';
import TooltipNavbar from './tooltipNavbar';
import './tooltip.css';
import ContentCarousel from './contentCarousel';

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
        setTimeout(() => {
            if ($('.Popover:hover').length === 0) {
                this.setShow(false);
            }
        }, 300);
        $('.Popover').on('mouseleave', () => {
            this.setShow(false);
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
