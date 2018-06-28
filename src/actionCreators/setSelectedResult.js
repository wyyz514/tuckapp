export const SET_SELECTED_RESULT = 'SET_SELECTED_RESULT';

export function setSelectedResult(resultId) {
    return {
        type: SET_SELECTED_RESULT,
        resultId
    }
}