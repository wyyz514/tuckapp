import React from 'react';
import './ResultCard.css';

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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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