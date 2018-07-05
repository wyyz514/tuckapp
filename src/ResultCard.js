import React from 'react';
import './ResultCard.css';

const truncate = (str) => {
    return str.substr(0, 175) + "...";
}

class ResultCard extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
        <div className="result-card-wrap">
            <div className="result-card">
                <div className="result-image" style={{backgroundImage: `url(${this.props.restaurant.links[this.props.restaurant.links.length - 1]}`}}></div>
                <div className="result-blurb">
                    <div className="result-blurb-head">
                        <span>{this.props.restaurant.name}</span>
                        <span className="grey">{this.props.restaurant.distanceFromUser}km</span>
                    </div>
                    <div className="grey" id="blurb">
                        {truncate(this.props.restaurant.description || "")}
                    </div>
                </div>
                <div className="result-action" onClick={this.props.resultActionHandler}>
                    See more
                </div>
            </div>
        </div>
    );   
    }
}

export default ResultCard;