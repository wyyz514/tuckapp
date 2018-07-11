import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getLocation, getLocationSuccess } from './actionCreators/getLocation';
import { Link } from 'react-router-dom';
import LocationInput from './LocationInput';
import './Home.css';

const checkboxValue = "location_permission_granted";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCheckboxChecked: false,
      checkboxDisabled: false,
      hasAddress: false
    };

    this.setLocation = this.setLocation.bind(this);
  }

  dispatchGetLocation(e) {
    if (e.target.checked) {
      this.setState({ isCheckboxChecked: true});
      this.props.dispatch(getLocation())
    }
    else {
      this.setState({ isCheckboxChecked: false});
    }
  }

  setLocation(coords) {
    this.props.dispatch(getLocationSuccess({ coords }));
  }

  render() {
    return (
      <div className="home-container">
        <div className="home-title-container">
          <img src="/TuckLogo.PNG" />
        </div>
        <div className="home-checkbox-container">
          <div>
            <input type="checkbox" value={checkboxValue} onChange={(e) => {this.dispatchGetLocation(e);}} disabled={this.state.checkboxDisabled}/>
          </div>
          <div>
            Grant permission to access location
          </div>
        </div>
        <div style={{color: "grey", fontSize: "12px"}}>OR</div>
        <div>
          <LocationInput selectHandler={this.setLocation} setAddressEntered={(address) => { if(address.length > 0) {this.setState({addressObtained: true})} else {this.setState({addressObtained: false})}}}  shouldDisable={this.state.isCheckboxChecked} toggleCheckbox={() => {this.setState(prevState => {return {checkboxDisabled: (!prevState.checkboxDisabled || prevState.addressObtained)}})}}/>
        </div>
        <HomeButton 
          isEnabled={this.state.addressObtained || this.state.isCheckboxChecked} 
        />
      </div>
    );
  }
}

const HomeButton = props => {
  return (

    <button className="home-button" disabled={!props.isEnabled}>
            {props.isEnabled ?
              <Link to="/search">
                Search restaurants
              </Link> :
              "Search restaurants"
            }
          
    </button>
  );
}

function mapStateToProps({ location }) {
  return { location };
}

export default connect(mapStateToProps, null)(Home);
