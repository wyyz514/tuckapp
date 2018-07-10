import React from 'react';
import './WorkingHours.css';
import moment from 'moment';
import IOClose from 'react-icons/lib/io/close';

const WorkingHoursItem = (props) => {
    let {day, hours} = props.time;
    return (
        <li className="working-hours-item" className={day[0] === moment().format('ddd') ? 'active' : ''}>
            <div>
                <span>{day}</span>
                <span>{hours}</span>
            </div>
        </li>
    );    
}

export default class WorkingHours extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return <div className={`${this.props.active ? "overlay active" : "overlay"}`}>
            <div className="working-hours-close-button" onClick={this.props.closeHandler}>
                <IOClose size={20} />
            </div>
            <div className={`${this.props.active ? "working-hours-container active" : "working-hours-containe"}`}>
                <ul className="working-hours-list">
                    {this.props.hours.map((h, i) => {
                        return <WorkingHoursItem time={h} key={i}/>
                    })}
                </ul>
            </div>
        </div>
    }
}