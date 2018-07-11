export const GET_LOCATION_QUERY = "GET_LOCATION_QUERY";
export const GET_LOCATION_SUCCESS = "GET_LOCATION_SUCCESS";

export function getLocationSuccess(location) {
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
            alert("Please turn on your geolocation services in order to proceed.", JSON.stringify(err));
        }

        let options = {
            enableHighAccuracy: false,
            timeout: 15000,
            maximumAge: 0
        };
        
        let id = navigator.geolocation.watchPosition(successHandler, errorHandler, options);
    }
}
