import React from 'react';
import './Result.css';

const Result = (props) => {
    return (
        <div className="result-container">
            <div className="result-pictures"></div>
            <div className="result-close-button" onClick={props.closeHandler}></div>
            <div className="result-info">
                <h2>{props.restaurant.name}</h2>
                <h5 className="grey">{props.restaurant.address}</h5>
                <h5 className="grey">
                    <span>{props.restaurant.price_range}</span>&nbsp;|&nbsp;<span className="green">Open until 11:30pm</span>
                </h5><br/>
                <p className="result-description">
                    Both iOS and Android provide APIs for making apps accessible to people with disabilities. In addition, both platforms provide bundled assistive technologies, like the screen readers VoiceOver (iOS) and TalkBack (Android) for the visually impaired. Similarly, in React Native we have included APIs designed to provide developers with support for making apps more accessible. Take note, iOS and Android differ slightly in their approaches, and thus the React Native implementations may vary by platform.
                </p>
            </div>
        </div>
    );
}

export default Result;