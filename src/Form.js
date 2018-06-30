import React, {Component} from 'react';
import './Form.css';

export class FormSection extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
   
   setSelectedInSection(selection) {
        this.setState((prevState) => {
            if(prevState.selected != selection) {
                return {selected: selection}
            }
            else {
                this.props.resetHandler(this.props.name);
                return {selected: "", activeId: -1}
            }
        });    
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
                        onClick={(e) => {this.setState({activeId: index}); this.props.changeHandler(e); this.setSelectedInSection(option)}} 
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