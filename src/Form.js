import React, {Component} from 'react';
import './Form.css';

export class FormSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIds: []
        };
    }
   
   renderFormSectionBody() {
       if(this.props.inputType === 'range') {
           return <input type="range" min={this.props.range.min} max={this.props.range.max} name={this.props.name} onChange={this.props.changeHandler} />
       }
       return this.props.options.map((option, index) => {
           return (
                <div className="form-button-wrap" key={index}>
                    <button type="button" className={this.state.selectedIds.indexOf(index) > -1 ? 'active' : ''}
                        key={index} 
                        
                        onClick={(e) => {
                           this.setState((prevState) => {
                               if(prevState.selectedIds.indexOf(index) > -1) {
                                   if(! this.props.multiple) {
                                        return {selectedIds: []};
                                   }
                                   else {    
                                        let ids = prevState.selectedIds.filter((id, i) => {
                                            if(id != index) {
                                                return id;
                                            }
                                        })
                                        return {selectedIds: ids}
                                   }
                                   
                               }
                               else {
                                   if(! this.props.multiple) {
                                        return {selectedIds: [index]};   
                                   }
                                   else 
                                        return {selectedIds: prevState.selectedIds.concat(index)};
                               }
                           });
                           this.props.changeHandler(e.target, this.props.multiple);
                        }}
                        
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