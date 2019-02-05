import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import TooltipMap from './tooltipMap';
import './contentCarousel.css';

// eslint-disable-next-line react/prefer-stateless-function
class ContentCarousel extends Component {
    render() {
        return (
            <Carousel showThumbs={false} showStatus={false} emulateTouch>
                <div className="carousel-item">
                    <TooltipMap name={this.props.name} />
                </div>
                <div className="carousel-item">
                    <h3>Instagram Coming Soon!</h3>
                </div>
                <div className="carousel-item">
                    <h3>Flight Details Coming Soon!</h3>
                </div>
                <div className="carousel-item">
                    <h3>Social Media Coming Soon!</h3>
                </div>
            </Carousel>
        );
    }
}

export default ContentCarousel;
