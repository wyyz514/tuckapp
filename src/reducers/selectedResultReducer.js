import {SET_SELECTED_RESULT} from '../actionCreators/setSelectedResult';

export default function setSelectedResult(state = {}, action) {
    switch(action.type) {
        
        case SET_SELECTED_RESULT:
            return Object.assign({}, state, {resultId: action.resultId})
        
        default:
            return state
    }
}