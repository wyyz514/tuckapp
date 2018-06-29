import React from 'react';
import './ResultCard.css';

const truncate = (str) => {
    return str.substr(0, 175);
}
const ResultCard = (props) => {
    return (
        <div className="result-card-wrap">
            <div className="result-card">
                <div className="result-image"></div>
                <div className="result-blurb">
                    <div className="result-blurb-head">
                        <span>{props.restaurant.name}</span>
                        <span className="grey">{props.restaurant.distanceFromUser}km</span>
                    </div>
                    <div className="grey" id="blurb">
                        {truncate(props.restaurant.description || "")}
                    </div>
                </div>
                <div className="result-action" onClick={props.resultActionHandler}>
                    See more
                </div>
            </div>
        </div>
    );
}

export default ResultCard;