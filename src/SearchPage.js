import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SearchPage.css';
import {getRestaurants} from './actionCreators/getRestaurants';
import {setSelectedResult} from './actionCreators/setSelectedResult';

import Form, { FormSection } from './Form';
import Result from './Result';
import ResultCard from './ResultCard';
import ReactSwipe from 'react-swipe';

const MEAL_TYPES = ['breakfast', 'lunch', 'brunch', 'dinner'];
const PRICE_TYPES = ['$', '$$', '$$$', '$$$$'];

const AMBIENCE_TYPES = ['fun and lively', 'calm and relaxed', 'formal and classy'];
const CUISINE_TYPES = ['any', 'french', 'italian', 'mexican', 'arabic'];

class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.setFilter = this.setFilter.bind(this);
    }


    setFilter(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    getRestaurants() {
        this.props.dispatch(getRestaurants({...this.state}, {...this.props.location}));
    }

    renderRestaurants() {
        return this.props.restaurants.restaurants.map((restaurant, index) => {
            return <ResultCard restaurant={restaurant} key={index} resultActionHandler={() => {this.setSelectedResult(index)}}/>;
        })
    }
    
    setSelectedResult(id) {
        this.props.dispatch(setSelectedResult(id));
    }
    
    renderResult() {
        if(this.props.resultId.resultId > -1) {
            return <Result closeHandler={() => {this.setSelectedResult(-1)}} restaurant={this.props.restaurants.restaurants[this.props.resultId.resultId]} />   
        }
        return ""
    }
    
    componentDidUpdate() {
        console.log(this.props)
    }
    
    render() {
        return (
            <div>
                <div className="search-page-container">
                    <h1>Find a restaurant</h1>
                    <Form>
                        <FormSection name="Meal" options={[...MEAL_TYPES]} changeHandler={this.setFilter}>
                        </FormSection>
                        
                        <FormSection name="Price" options={[...PRICE_TYPES]} changeHandler={this.setFilter}>
                        </FormSection>
                        
                        <FormSection name="Distance" inputType="range" range={{min:1, max:10}} changeHandler={this.setFilter}>
                            <p>{this.state.Distance || 0} km</p>
                        </FormSection>
                        
                        <FormSection name="Ambience" options={[...AMBIENCE_TYPES]} changeHandler={this.setFilter}>
                        </FormSection>
                        
                        <FormSection name="Cuisine" options={[...CUISINE_TYPES]} changeHandler={this.setFilter}>
                        </FormSection>
                        <FormSection options={[]}>
                            <button type="button" id="find-restos" className="full-button" onClick={() => {this.getRestaurants(); this.setState({hasSearched: true})}}>Find restaurants</button>
                        </FormSection>
                    </Form>
                </div>
                <div className="results-container">
                    {this.props.restaurants.restaurants && this.props.restaurants.restaurants.length > 0 ? <ReactSwipe>{this.renderRestaurants()}</ReactSwipe> : (this.state.hasSearched ? "No restaurants found" : "")}
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
