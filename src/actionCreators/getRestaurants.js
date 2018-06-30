import { base, storage } from '../DB';

export const GET_RESTAURANTS_QUERY = 'GET_RESTAURANTS_QUERY';
export const GET_RESTAURANTS_SUCCESS = 'GET_RESTAURANTS_SUCCESS';

export function getRestaurants({ Meal = null, Cuisine = null, Distance = "", Ambience = "", Price = null }, { latitude, longitude }) {

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
        return d.toFixed(1);
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

                        if (!Meal && !Cuisine) {
                            return restaurant;
                        }

                        if (!mealMatch && Cuisine == "any") {
                            return restaurant;
                        }

                        if (mealMatch || (cuisineMatch && Cuisine != "any")) {
                            return restaurant;
                        }
                    })
                    .filter((restaurant) => {
                        if (!Price) {
                            return restaurant;
                        }

                        if (restaurant.price_point == Price.length) {
                            return restaurant;
                        }
                    })
                    .map((restaurant) => {
                        return Object.assign({}, restaurant, {
                            distanceFromUser: getDistanceFromLatLonInKm(parseFloat(latitude), parseFloat(longitude), parseFloat(restaurant.latitude), parseFloat(restaurant.longitude))
                        });
                    })
                    .filter((restaurant) => {
                        if (!Distance) {
                            return restaurant;
                        }

                        if (restaurant.distanceFromUser <= parseInt(Distance)) {
                            return restaurant;
                        }
                    })
                    
                    dispatch(getPicLinks(filteredRestaurants));
            });
    })
}

function getPicLinks(restaurants) {
    let restos = [];
    return (dispatch) => {
        
        let rs = restaurants.map((r, i) => {
            r.links = [];
            [1,2,3,4].map((n) => {
                storage.child(`${r.name}/${n}.jpg`).getDownloadURL().then((url) => {
                    r.links = r.links.concat(url);
                })
            });
            
            return r;
        })
        
        dispatch(getRestaurantsSuccess(rs));
    }
}
//dispatch(getRestaurantsSuccess(filteredRestaurants));

function getRestaurantsSuccess(restaurants) {

    return {
        type: GET_RESTAURANTS_SUCCESS,
        restaurants
    }
}
