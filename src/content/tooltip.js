import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Popover from 'react-popover';
import TooltipMap from './tooltipMap';
import TooltipNavbar from './components/tooltipNavbar';
import './tooltip.css';

const PopoverContent = ({ title }) => (
    <div className="wanderland-popover">
        <TooltipNavbar />
        <div className="tooltipdiv">
            <TooltipMap title={title} />
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
    }

    setShow(state) {
        this.setState({ show: state });
    }

    toggleShow() {
        this.setState(prevState => ({ show: !prevState.show }));
    }

    render() {
        return (
            <Popover
                isOpen={this.state.show}
                body={[<PopoverContent title={this.props.place.title} />]}
                onOuterAction={() => this.setShow(false)}
            >
                <button type="button" className="anchor-like-button" onClick={this.toggleShow}>
                    {this.props.place.title}
                </button>
            </Popover>
        );
    }
}

export function insertTooltips(place, wrapClass) {
    const elements = document.getElementsByClassName(wrapClass);

    [].forEach.call(elements, (container) => {
        ReactDOM.render(<Tooltip place={place} />, container);
    });
}
