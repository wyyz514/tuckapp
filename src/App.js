import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import Home from './Home';
import SearchPage from './SearchPage';

export default class App extends Component {
  render() {
    return (
      <Provider store={createStore(rootReducer, applyMiddleware(thunkMiddleware))}>
        <Router>
          <div>
            <Route path="/" exact component={Home}/>
            <Route path="/search" exact component={SearchPage}/>
          </div>
        </Router>
      </Provider>
    )    
    
  }
}