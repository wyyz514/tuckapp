import React from 'react';
import './Result.css';
import Carousel from 'nuka-carousel';

class Result extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isExpanded: false
        };
    }
    
    expandHandler() {
        this.setState((prevState) => {
            return {isExpanded: !prevState.isExpanded};
        });    
    }
    
    renderImages() {
        return this.props.restaurant.links.map((link, index) => {
            return <div style={{backgroundImage: `url(${link})`}} className="restoImages" key={index}/>;
        })    
    }
    
    render() {
        return (
        <div className="result-container">
            <div className="result-pictures">
                <Carousel>
                    {this.renderImages()}
                </Carousel>
            </div>
            <div className="result-close-button" onClick={this.props.closeHandler}></div>
            <div className={this.state.isExpanded ? "result-info expanded" : "result-info"}>
                <div className="expand-toggle" onClick={() => {this.expandHandler();}}>{this.state.isExpanded ? "Minimize" : "Expand"}</div><br/>
                <h2>{this.props.restaurant.name}</h2>
                <h5 className="grey">{this.props.restaurant.address}</h5>
                <h5 className="grey">
                    <span>{this.props.restaurant.price_range}</span>&nbsp;|&nbsp;<span className="green">Open until 11:30pm</span>
                </h5><br/>
                <p className="result-description">
                    {this.props.restaurant.description}
                </p>
            </div>
        </div>
    );
    }
}

export default Result;