import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SearchPage.css';
import { getRestaurants } from './actionCreators/getRestaurants';
import { setSelectedResult } from './actionCreators/setSelectedResult';

import Form, { FormSection } from './Form';
import Result from './Result';
import ResultCard from './ResultCard';

const MEAL_TYPES = ['breakfast', 'lunch', 'brunch', 'dinner'];
const PRICE_TYPES = ['$', '$$', '$$$', '$$$$'];

const AMBIENCE_TYPES = ['fun and lively', 'calm and relaxed', 'formal and classy'];

class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchCounter: 0,
            filters: {},
            renderedRestaurants: 5
        };
        
        this.setFilter = this.setFilter.bind(this);
    }

    getRestaurants() {
        this.props.dispatch(getRestaurants({ ...this.state.filters }, { ...this.props.location }));
    }

    renderRestaurants() {
        if (!this.props.restaurants.restaurants) {
            return "";
        }

        if (this.props.restaurants.restaurants.length == 0) {
            return <div className="results-empty">Sorry, we couldn't find any restaurants. Please try modifying your search.</div>
        }

        
        return this.props.restaurants.restaurants.slice(0, this.state.renderedRestaurants).map((restaurant, index) => {
            return <ResultCard restaurant={restaurant} key={index} resultActionHandler={() => {this.setSelectedResult(index);}}/>
        })
    }

    setSelectedResult(id) {
        this.props.dispatch(setSelectedResult(id));
    }

    renderResult() {
        if (this.props.resultId.resultId > -1) {
            return <Result closeHandler={() => {this.setSelectedResult(-1)}} restaurant={this.props.restaurants.restaurants[this.props.resultId.resultId]} />
        }
        return ""
    }

    componentDidMount() {
        window.addEventListener('scroll', (e) => {
            if (window.pageYOffset > 300) {
                this.setState({ upButtonVisible: true });
            }
            else {
                this.setState({ upButtonVisible: false });
            }
        });
    }

    setFilter(e, isMultiple) {
        this.setState((prevState) => {
            let selectedFilters = prevState.filters[e.name] || [];
            
            if (selectedFilters.indexOf(e.value) > -1) {
                if (isMultiple) {
                    let filterIndex    = selectedFilters.indexOf(e.value);
                    selectedFilters    = selectedFilters.filter((param, index) => {if(index != filterIndex) {return param} });
                    
                    return {
                        filters: { ...prevState.filters, [e.name]: selectedFilters }
                    };
                }
                else {
                    return {
                        filters: {...prevState.filters, [e.name]: []}
                    }
                }
            }
            else {
                return {
                    filters: {...prevState.filters, [e.name]: isMultiple ? selectedFilters.concat(e.value): [e.value]}
                };
            }
        });
    }
    
    shouldEnableButton() {
        return (this.state.filters.Meal && this.state.filters.Meal.length > 0) || 
               (this.state.filters.Price && this.state.filters.Price.length > 0) ||
               (this.state.filters.Distance && parseInt(this.state.filters.Distance) > 0) ||
               (this.state.filters.Ambience && this.state.filters.Ambience.length > 0)
                
    }
    
    render() {
        return (
            <div>
                <div className="splash-container"></div>
                <div className="search-page-container" ref={(el) => {this.searchPageContainerEl = el;}}>
                    {this.state.upButtonVisible && <div className="up-button" onClick={()=>{window.scrollTo(0,0)}}>Back to top</div>}
                    <h2>Find a restaurant</h2>
                    <Form>
                        <FormSection name="Meal" options={[...MEAL_TYPES]} changeHandler={this.setFilter}>
                        </FormSection>
                        
                        <FormSection name="Price" options={[...PRICE_TYPES]} changeHandler={this.setFilter} multiple={true}>
                        </FormSection>
                        
                        <FormSection name="Distance" inputType="range" range={{min:1, max:10}} changeHandler={(e)=>{ let target = e.target; this.setState((prevState) => {return {filters: Object.assign({}, prevState.filters, {Distance: target.value})}; }) }}>
                            <p>{this.state.filters.Distance || 0} km</p>
                        </FormSection>
                        
                        <FormSection name="Ambience" options={[...AMBIENCE_TYPES]} changeHandler={this.setFilter} multiple={true}>
                        </FormSection>
                        <FormSection options={[]}>
                                <button type="button" id="find-restos" className="full-button" disabled={this.shouldEnableButton() ? '' : 'disabled'} onClick={() => {this.getRestaurants(); this.setState((prevState) => {
                                    return {searchCounter: prevState.searchCounter + 1, hasSearched: true};
                                });}}><a href="#results">Find restaurants</a></button>
                        </FormSection>
                    </Form>
                </div>
                <div className="results-container" id="results">
                    {this.props.restaurants.restaurants && <p style={{textAlign: "center", fontSize:"12px"}} className="green">{(this.props.restaurants.restaurants && this.props.restaurants.restaurants.length) || 0} restaurants found</p>}
                    {this.renderRestaurants()}
                    {this.props.restaurants.restaurants && <button type="button" className="full-button" onClick = {() => {
                        this.setState((prevState) =>
                            {
                                return {renderedRestaurants: prevState.renderedRestaurants + 5
                                    
                            }
                        
                    })}} disabled={this.state.renderedRestaurants >= this.props.restaurants.restaurants.length - 1 ? 'disabled' : ''}>See more</button>}
                </div>
                {this.renderResult()}
            </div>
        );
    }
}


function mapStateToProps({ location, restaurants, resultId }) {
    return { location, restaurants, resultId };
}

export default connect(mapStateToProps, null)(SearchPage);
