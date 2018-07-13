import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SearchPage.css';
import { getRestaurants } from './actionCreators/getRestaurants';
import { setSelectedResult } from './actionCreators/setSelectedResult';
import Navbar from './Navbar';
import Form, { FormSection } from './Form';
import Result from './Result';
import ResultCard from './ResultCard';
import ScrollToTop from 'react-scroll-up';

const MEAL_TYPES = ['breakfast', 'brunch', 'lunch', 'dinner'];
const PRICE_TYPES = ['$', '$$', '$$$', '$$$$'];

const AMBIENCE_TYPES = ['lively', 'relaxed', 'formal'];

class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchCounter: 0,
            filters: {
                'Price': ['$$', '$$$'],
                'Ambience': ['lively', 'relaxed']
            },
            location: JSON.parse(localStorage.getItem('location')),
            renderedRestaurants: 0
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

        let resultsToRender = this.props.restaurants.restaurants.slice(0, this.state.renderedRestaurants)

        return resultsToRender.map((restaurant, index) => {
            return <ResultCard restaurant={restaurant} links={restaurant.links} key={restaurant.name} resultActionHandler={() => {this.setSelectedResult(index);}} />
        })
    }

    setSelectedResult(id) {
        this.props.dispatch(setSelectedResult(id));
    }

    renderResult() {
        if (this.props.resultId.resultId > -1) {
            this.toggleBodyFreeze();
            return <Result closeHandler={() => {this.setSelectedResult(-1); this.toggleBodyFreeze();}} restaurant={this.props.restaurants.restaurants[this.props.resultId.resultId]} location={this.state.location}/>
        }
        return ""
    }

    toggleBodyFreeze() {
        if (document.body.classList.contains('freeze')) {
            document.body.classList.remove('freeze')
        }
        else {
            document.body.classList.add('freeze');
        }
    }

    setFilter(e, isMultiple) {
        this.setState((prevState) => {
            let selectedFilters = prevState.filters[e.name] || [];

            if (selectedFilters.indexOf(e.value) > -1) {
                if (isMultiple) {
                    let filterIndex = selectedFilters.indexOf(e.value);
                    selectedFilters = selectedFilters.filter((param, index) => { if (index != filterIndex) { return param } });

                    return {
                        filters: { ...prevState.filters, [e.name]: selectedFilters }
                    };
                }
                else {
                    return {
                        filters: { ...prevState.filters, [e.name]: [] }
                    }
                }
            }
            else {
                return {
                    filters: { ...prevState.filters, [e.name]: isMultiple ? selectedFilters.concat(e.value) : [e.value] }
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
                <Navbar />
                <div className="search-page-container" ref={(el) => {this.searchPageContainerEl = el;}}>
                    <ScrollToTop showUnder={300}>
                        <div className="up-button">Back to top</div>
                    </ScrollToTop>
                    <Form>
                        <FormSection name="Meal" options={[...MEAL_TYPES]} changeHandler={this.setFilter} className="flexed-form-section">
                        </FormSection>
                        
                        <FormSection name="Price" options={[...PRICE_TYPES]} changeHandler={this.setFilter} multiple={true} className="flexed-form-section" defaultSelected={[1, 2]}>
                        </FormSection>
                        
                        <FormSection name="Distance" inputType="range" unit="km" shouldShowValue={true} value={this.state.filters.Distance || 4} range={{min:1, max:10}} changeHandler={(e)=>{ let target = e.target; this.setState((prevState) => {return {filters: Object.assign({}, prevState.filters, {Distance: target.value})}; }) }}>
                        </FormSection>
                        
                        <FormSection name="Ambience" options={[...AMBIENCE_TYPES]} changeHandler={this.setFilter} multiple={true} className="flexed-form-section" defaultSelected={[0, 1]}>
                        </FormSection>
                        <FormSection options={[]}>
                                    <button type="button" id="find-restos" className="full-button" disabled={this.shouldEnableButton() ? '' : 'disabled'} onClick={() => {this.getRestaurants(); this.setState((prevState) => {
                                        return {searchCounter: prevState.searchCounter + 1, hasSearched: true, renderedRestaurants: 5};
                                    });}}>Find restaurants</button>
                        </FormSection> 
                    </Form>
                </div>
               
                <div className="results-container" id="results">
                    {this.renderRestaurants()}
                    
                     {this.props.restaurants.restaurants && <button type="button" className="full-button" onClick = {() => {
                        this.setState((prevState) =>
                            {
                                return {renderedRestaurants: prevState.renderedRestaurants + 5
                                    
                            }
                        
                    })}} disabled={this.state.renderedRestaurants >= this.props.restaurants.restaurants.length  ? 'disabled' : ''}>Load more restaurants</button>}
                </div>
                {this.renderResult()}
            </div>
        );
    }
}


function mapStateToProps({restaurants, resultId }) {
    return {restaurants, resultId };
}

export default connect(mapStateToProps, null)(SearchPage);
