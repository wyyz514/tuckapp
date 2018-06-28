import {combineReducers} from 'redux';
import locationReducer from './locationReducer';
import restaurantReducer from './restaurantReducer'
import selectedResultReducer from './selectedResultReducer'

const rootReducer = combineReducers({
    location: locationReducer,
    restaurants: restaurantReducer,
    resultId: selectedResultReducer
});

export default rootReducer;