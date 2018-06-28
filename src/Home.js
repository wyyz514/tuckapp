import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getLocation} from './actionCreators/getLocation';
import {Link} from 'react-router-dom';

import './Home.css';

const checkboxValue = "location_permission_granted";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCheckboxChecked: false
    };
  }
  
  dispatchGetLocation(e) {
    if(e.target.checked){
      this.setState({isCheckboxChecked: true});
      this.props.dispatch(getLocation())
    }
    else {
      this.setState({isCheckboxChecked: false});
    }
  }
  
  render() {
    return (
      <div className="home-container">
        <div className="home-title-container">
          <h1>FoodApp</h1>
        </div>
        <div className="home-checkbox-container">
          <div>
            <input type="checkbox" value={checkboxValue} onChange={(e) => {this.dispatchGetLocation(e);}}/>
          </div>
          <div>
            Grant permission to access location
          </div>
        </div>
        <button className="home-button" disabled={Object.entries(this.props.location).length === 0 || !this.state.isCheckboxChecked}>
          <Link to="/search">Search restaurants</Link>
        </button>
      </div>
    );
  }
}

function mapStateToProps({location}) {
  return {location};
}

export default connect(mapStateToProps, null)(Home);
