import React from 'react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
}
from 'react-places-autocomplete';

import './LocationInput.css';

export default class LocationInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { address: '' };
    }

    handleChange = address => {
        this.props.setAddressEntered(address);
        this.setState({ address });
    };

    handleSelect = address => {
        geocodeByAddress(address)
            .then(results => {this.setState({address: results[0].formatted_address}); return getLatLng(results[0]);})
            .then(latLng =>  {let {lng: longitude, lat: latitude} = {...latLng}; this.props.selectHandler({longitude, latitude})})
            .catch(error => console.error('Error', error));
    };
    
    render() {
        return (
            <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          
          <div className="location-input-wrap">
            <input
              {...getInputProps({
                placeholder: 'Enter an address',
                className: 'location-search-input',
                autoCorrect: 'off',
                spellCheck: 'false',
                disabled: this.props.shouldDisable,
                onFocus: this.props.toggleCheckbox,
                onBlur: this.props.toggleCheckbox
              })}
            />
            {suggestions.length > 0 && <div className="autocomplete-dropdown-container">
              {loading && <div style={{fontSize: "12px", color: "#cecece", margin: "8px"}}>Loading...</div>}
              {suggestions.slice(0, 5).map(suggestion => {
                const className = 'suggestion-item';
                
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className
                    })}
                  >
                  <span>{suggestion.description.slice(0, 50)}{suggestion.description.length <= 50 ? "" : "..."}</span>
                  </div>
                );
              })}
            </div>}
          </div>
        )}
      </PlacesAutocomplete>
        );
    }
}