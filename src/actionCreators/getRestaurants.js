import { base } from '../DB';

export const GET_RESTAURANTS_QUERY = 'GET_RESTAURANTS_QUERY';
export const GET_RESTAURANTS_SUCCESS = 'GET_RESTAURANTS_SUCCESS';

export function getRestaurants({ Meal=null, Cuisine=null, Distance="", Ambience="", Price=null }, { latitude, longitude }) {
    
    function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2 - lat1); // deg2rad below
        var dLon = deg2rad(lon2 - lon1);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return Math.round(d);
    }

    function deg2rad(deg) {
        return deg * (Math.PI / 180)
    }
    
    return ((dispatch) => {
        base.fetch('/', {
                asArray: true
            })
            .then((restaurants) => {
                let filteredRestaurants = restaurants
                    .filter((restaurant) => {
                        let mealMatch = restaurant.category.toLowerCase().match(Meal);
                        let cuisineMatch = restaurant.category.toLowerCase().match(Cuisine);
                        
                        if (mealMatch || cuisineMatch) {
                            return restaurant;
                        }
                    })
                    .filter((restaurant) => {
                        if(!Price) {
                            return restaurant;
                        }
                        
                        if(restaurant.price_point == Price.length) {
                            return restaurant;
                        }
                    })
                    .map((restaurant) => {
                        return Object.assign({}, restaurant, {distanceFromUser: 
                            getDistanceFromLatLonInKm(parseFloat(latitude), parseFloat(longitude), parseFloat(restaurant.latitude), parseFloat(restaurant.longitude))
                        });
                    })
                    .filter((restaurant) => {
                        if(!Distance) {
                            return restaurant;
                        }
                        
                        if(restaurant.distanceFromUser <= parseInt(Distance)) {
                            return restaurant;
                        }
                    })
                dispatch(getRestaurantsSuccess(filteredRestaurants));
            });
    })
}

function getRestaurantsSuccess(restaurants) {
    return {
        type: GET_RESTAURANTS_SUCCESS,
        restaurants
    };
}
