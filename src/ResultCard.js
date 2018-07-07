import React from 'react';
import './ResultCard.css';
import { storage } from './DB';

const truncate = (str) => {
    return str.substr(0, 175) + "...";
}

class ResultCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            url: ''
        };

        storage.child(`${props.restaurant.name}/9.jpg`).getDownloadURL().then((url) => {
            this.setState({ url })
        }).catch((e) => {
            if (e) {
                storage.child(`${props.restaurant.name}/9.jpeg`).getDownloadURL().then((url) => {
                    this.setState({ url })
                })
            }
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextState.url != this.state.url) {
            return true;
        }
        return false;
    }
    
    render() {
        return (
            <div className="result-card-wrap">
            <div className="result-card">
                <div className="result-image" style={{backgroundImage: `url(${this.state.url}`}}></div>
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
