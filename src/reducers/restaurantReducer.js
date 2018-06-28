import {GET_RESTAURANTS_SUCCESS} from '../actionCreators/getRestaurants';

export default function restaurantReducer(state = {}, action) {
    switch(action.type) {
        case GET_RESTAURANTS_SUCCESS:
            return Object.assign({}, state, {restaurants: action.restaurants})
        default:
            return state;
    }
}