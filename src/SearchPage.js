import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SearchPage.css';
import {getRestaurants} from './actionCreators/getRestaurants';
import {setSelectedResult} from './actionCreators/setSelectedResult';

import Form, { FormSection } from './Form';
import Result from './Result';
import ResultCard from './ResultCard';

const MEAL_TYPES = ['breakfast', 'lunch', 'brunch', 'dinner'];
const PRICE_TYPES = ['$', '$$', '$$$', '$$$$'];

const AMBIENCE_TYPES = ['fun and lively', 'calm and relaxed', 'formal and classy'];
const CUISINE_TYPES = ['any', 'french', 'italian', 'mexican', 'middle-eastern'];

class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchCounter: 0,
            buttonEnabled: false
        };
        this.setFilter = this.setFilter.bind(this);
    }


    setFilter(e) {
        this.setState({
            [e.target.name]: e.target.value,
            buttonEnabled: true
        });
    }
    
    resetFilter(e) {
        let el = e.target;
        this.setState({[el.name]:""});
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
    
    componentDidMount() {
        window.addEventListener('scroll', (e) => {
            if(window.pageYOffset > 300) {
                this.setState({upButtonVisible: true});
            }
            else {
                this.setState({upButtonVisible: false});
            }
        });
    }
    
    render() {
        return (
            <div>
                <div className="search-page-container" ref={(el) => {this.searchPageContainerEl = el;}}>
                    {this.state.upButtonVisible && <div className="up-button" onClick={()=>{window.scrollTo(0,0)}}>Back to top</div>}
                    <h1>Find a restaurant</h1>
                    <Form>
                        <FormSection name="Meal" options={[...MEAL_TYPES]} changeHandler={this.setFilter} resetHandler={(e) => {this.resetFilter(e)}}>
                        </FormSection>
                        
                        <FormSection name="Price" options={[...PRICE_TYPES]} changeHandler={this.setFilter} resetHandler={(e) => {this.resetFilter(e)}}>
                        </FormSection>
                        
                        <FormSection name="Distance" inputType="range" range={{min:1, max:10}} changeHandler={this.setFilter}>
                            <p>{this.state.Distance || 0} km</p>
                        </FormSection>
                        
                        <FormSection name="Ambience" options={[...AMBIENCE_TYPES]} changeHandler={this.setFilter} resetHandler={(e) => {this.resetFilter(e)}}>
                        </FormSection>
                        
                        <FormSection name="Cuisine" options={[...CUISINE_TYPES]} changeHandler={this.setFilter} resetHandler={(e) => {this.resetFilter(e)}}>
                        </FormSection>
                        <FormSection options={[]}>
                                <button type="button" id="find-restos" className="full-button" disabled={(!this.state.buttonEnabled)? 'disabled' : ''} onClick={() => {this.getRestaurants(); this.setState((prevState) => {
                                    return {searchCounter: prevState.searchCounter + 1, hasSearched: true};
                                });}}><a href="#results">Find restaurants</a></button>
                        </FormSection>
                    </Form>
                </div>
                <div className="results-container" id="results">
                    {this.props.restaurants.restaurants && this.props.restaurants.restaurants.length > 0 ? this.renderRestaurants() : (this.state.hasSearched ? <div className="results-empty">Sorry, we couldn't find any restaurants. Please try modifying your search.</div> : "")}
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
