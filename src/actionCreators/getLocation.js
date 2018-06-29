export const GET_LOCATION_QUERY = "GET_LOCATION_QUERY";
export const GET_LOCATION_SUCCESS = "GET_LOCATION_SUCCESS";

function getLocationSuccess(location) {
    return {
        type: GET_LOCATION_SUCCESS,
        location: location.coords
    }
}

export function getLocation() {

    return function(dispatch) {
        let successHandler = (location) => {
            dispatch(getLocationSuccess(location));
            navigator.geolocation.clearWatch(id);
        };

        let errorHandler = (err) => {
            alert(err.message);
        }

        let options = {
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: 0
        };
        
        let id = navigator.geolocation.watchPosition(successHandler, errorHandler, options);
    }
}
