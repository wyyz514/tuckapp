import {GET_LOCATION_SUCCESS} from '../actionCreators/getLocation';

export default function getLocationReducer(state={}, action) {
    switch(action.type) {
        case GET_LOCATION_SUCCESS:
            let {longitude, latitude} = action.location;
            return Object.assign({}, state, {longitude, latitude});
        default:
            return state;
    }
}