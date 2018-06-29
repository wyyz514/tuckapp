import React, {Component} from 'react';
import './Form.css';

export class FormSection extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
   
   setActiveButton(e) {
       let buttons = [...this.buttonContainer.querySelectorAll('button')];
       buttons.map((button) => {
           if(e.target != button && button.classList.contains('active')) {
               button.classList.remove('active');
           }
       });
   }
   
   
   resetFilter() {
        this.setState({activeId: -1});
   }
   
   renderFormSectionBody() {
       if(this.props.inputType === 'range') {
           return <input type="range" min={this.props.range.min} max={this.props.range.max} name={this.props.name} onChange={this.props.changeHandler} />
       }
       return this.props.options.map((option, index) => {
           return (
                <div className="form-button-wrap" key={index}>
                    <button type="button" className={this.state.activeId == index ? 'active' : ''} 
                        key={index} 
                        onClick={(e) => {this.setState({activeId: index}); this.props.changeHandler(e); this.setActiveButton(e);}} 
                        name={this.props.name} 
                        value={option}>
                        {option}
                    </button>
                </div>
           )
       });
   }
   
   render() {
       return (
        <div className="form-section">
            <div className="title-smallbutton">
            {this.props.name || ""}
            {(this.props.name != "Distance" && this.props.name) ? <button type="button" className="small-button" name={this.props.name} onClick={(e)=>{this.resetFilter(); this.props.resetHandler(e);}}>Remove Filter</button> : ""}
            </div>
            <div className="form-section-container" ref={(el) => {this.buttonContainer = el;}}>
                {this.props.children}
                {this.renderFormSectionBody()}
            </div>
        </div>
    );
   }
   
};

export default class Form extends Component {
    render() {
    return (
            <form>
                {this.props.children}
            </form>
        );
    }
}