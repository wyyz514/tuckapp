import React from 'react';
import './Result.css';
import Carousel from 'nuka-carousel';
import {storage} from './DB';
import ArrowLeft from 'react-icons/lib/io/android-arrow-back'

class Result extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isExpanded: false, 
            urls: []
        };
        
        
        [1,2,3,4,9].map((i) => {
            storage.child(`${props.restaurant.name}/${i}.jpg`).getDownloadURL().then((url) => {
                this.setState((prevState) => {
                    return {urls: prevState.urls.concat(url)}
                })  
            })
        });
    }
    
    expandHandler() {
        this.setState((prevState) => {
            return {isExpanded: !prevState.isExpanded};
        });    
    }
    
    renderImages() {
        return this.state.urls.map((link, index) => {
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
            <div className="result-close-button" onClick={this.props.closeHandler}>
                <ArrowLeft size={18}/>
            </div>
            <div className={this.state.isExpanded ? "result-info expanded" : "result-info"}>
                <div className="expand-toggle" onClick={() => {this.expandHandler();}}>{this.state.isExpanded ? "Minimize" : "Expand"}</div><br/>
                <h2>{this.props.restaurant.name}</h2>
                <h5 className="grey">{this.props.restaurant.address}</h5>
                <h5 className="grey">
                    <span>{this.props.restaurant.price_range}</span>&nbsp;|&nbsp;<span className={this.props.restaurant.isOpen ? 'green' : 'red'}>{this.props.restaurant.isOpen ? (this.props.restaurant.isOpen24hrs ? "Open 24 hrs" : (this.props.restaurant.untilTime ? "Open now until " + this.props.restaurant.untilTime : ""))  : ((this.props.restaurant.untilTime ? "Closed now until " + this.props.restaurant.untilTime : "Closed now"))}</span>
                </h5><br/>
                <div className="result-description">
                    {this.props.restaurant.description}
                </div>
                <div className="result-actions">
                    <a target="_blank" href={this.props.restaurant['Menu Link'] ? this.props.restaurant['Menu Link'] : "#"}>
                        <button className="small-button" disabled={!this.props.restaurant['Menu Link'] ? 'disabled' : ''}>
                            Menu
                        </button>
                    </a>
                    <a target="_blank" href={this.props.restaurant['Map Link'] ? this.props.restaurant['Map Link'] : "#"}>
                        <button className="small-button" disabled={!this.props.restaurant['Map Link'] ? 'disabled' : ''}>
                            Map
                        </button>
                    </a>
                    <a target="_blank" href={this.props.restaurant['Booking Link'] ? this.props.restaurant['Booking Link'] : "#"}>
                        <button className="small-button" disabled={!this.props.restaurant['Booking Link'] ? 'disabled' : ''}>
                            Book
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
    }
}

export default Result;