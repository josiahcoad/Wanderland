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
                    <h3>Instagram Pictures Coming Soon!</h3>
                    <img src="https://s3.amazonaws.com/revsearch-assets/insta.png" alt="instagram" id="instagram" />
                </div>
                <div className="carousel-item">
                    <h3>Flight Details Coming Soon!</h3>
                    <img src="https://s3.amazonaws.com/revsearch-assets/flights.gif" alt="flights" id="flights" />
                </div>
                <div className="carousel-item">
                    <h3>Social Interaction Coming Soon!</h3>
                    <img src="https://s3.amazonaws.com/revsearch-assets/fb.png" alt="facebook" id="facebook" />
                </div>
            </Carousel>
        );
    }
}

export default ContentCarousel;
