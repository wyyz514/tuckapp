import { base, storage } from '../DB';
import * as moment from 'moment';
export const GET_RESTAURANTS_QUERY = 'GET_RESTAURANTS_QUERY';
export const GET_RESTAURANTS_SUCCESS = 'GET_RESTAURANTS_SUCCESS';

export function getRestaurants({ Meal = [], Cuisine = [], Distance = "", Ambience = [], Price = [] }, { latitude, longitude }) {

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
    
    function pricePointToPrice(pricePoint) {
        let price = "";
        let count = 0;
        
        while(count < pricePoint) {
            price += "$";
            count += 1;
        }
        
        return price;
    }
    
    
    function setStatus(restaurant, shortDay) {
        console.log(restaurant)
        let times = JSON.parse(restaurant[`working_hours__${shortDay}`]);   
        
        function isAM(time) {
            return time.slice(-3).trim() === "am";
        }
        
        function setStatusHelper(times, index) {
            if(!times[index]) {
                return Object.assign({}, restaurant, {isOpen: false});
            }
            
            let parsedTime = times[index];
            
            let _startTime = parsedTime.startTime;
            let _endTime   = parsedTime.endTime;
            
            let startTime = _startTime.slice(0, _startTime.length - 3).split(":");
            let endTime   = _endTime.slice(0, _endTime.length - 3).split(":"); 
            
            let startTimeHour   = isAM(_startTime) ? (startTime[0] === "12" ? 0 :parseInt(startTime[0])) : (startTime[0] === "12" ? 12 : parseInt(startTime[0]) + 12);
            let startTimeMinute = startTime[1];
            
            
            let endTimeHour     = isAM(_endTime) ? (endTime[0] === "12" ? 0 :parseInt(endTime[0])) : (endTime[0] === "12" ? 12 : parseInt(endTime[0]) + 12);
            let endTimeMinute   = endTime[1];
            
            let momentStartTime = moment().hours((startTimeHour == 12 ? 0 : startTimeHour)).minutes(startTimeMinute);
            let momentEndTime   = moment().hours((endTimeHour == 12 ? 0 : endTimeHour)).minutes(endTimeMinute);
            
            
            
            if(startTimeHour == 0) {
                momentStartTime = momentStartTime.add(1, 'day');
            }
            
            if(endTimeHour == 0) {
                momentEndTime = momentEndTime.add(1, 'day');
            }
            
            if(moment().diff(momentStartTime) < 0) {
                return Object.assign({}, restaurant, {isOpen: false});
            }
            
            if(moment().diff(momentStartTime) >= 0 && moment().diff(momentEndTime) < 0) {
                return Object.assign({}, restaurant, {isOpen: true});
            }
            
            if(moment().diff(momentStartTime) >= 0 && moment().diff(momentEndTime) > 0) {
                return setStatusHelper(times, index + 1);
            }
            
            
        }
        
        return setStatusHelper(times, 0);
    }
    
    return ((dispatch) => {
                base.fetch('/masterSheet', {

                asArray: true
            })
            .then((restaurants) => {
                let columnNames = restaurants[0];
                
                let _restaurants = restaurants.slice(1).map((restaurant) => {
                    let restaurantObj = {};
                    
                    for(let i = 0; i < columnNames.length; i++) {
                        restaurantObj[columnNames[i]] = restaurant[i];
                    }
                    
                    return restaurantObj;
                })
                
                let filteredRestaurants = _restaurants
                    .filter((restaurant) => {
                        if(Meal.length == 0) {
                            return restaurant;
                        }
                        
                        if(restaurant["info__Good For"].toLowerCase().includes(Meal[0])) {
                            return restaurant;
                        }
                    })
                    .filter((restaurant) => {
                        if (Price.length == 0) {
                            return restaurant;
                        }

                        if (Price.includes(pricePointToPrice(restaurant.price_point))) {
                            return restaurant;
                        }
                    })
                    .map((restaurant) => {
                        return Object.assign({}, restaurant, {
                            distanceFromUser: getDistanceFromLatLonInKm(parseFloat(latitude), parseFloat(longitude), parseFloat(restaurant.latitude), parseFloat(restaurant.longitude))
                        });
                    })
                    .filter((restaurant) => {
                        if(Ambience.length == 0) {
                            return restaurant;
                        }
                        
                        let splitAmbiences = Ambience.map((ambience) => {
                            let split = ambience.split(" and ");
                            return split;
                        })
                        .reduce((prev, next) => {
                            return prev.concat(next);
                        }, [])
                        
                        if(splitAmbiences.includes(restaurant.Ambience.toLowerCase())) {
                            return restaurant;
                        }
            
                    })
                    .filter((restaurant) => {
                        if (!Distance) {
                            return restaurant;
                        }

                        if (restaurant.distanceFromUser <= parseInt(Distance)) {
                            return restaurant;
                        }
                    })
                    .map((restaurant) => {
                       return setStatus(restaurant, moment().format('ddd'));
                    })
                    
                    dispatch(getPicLinks(filteredRestaurants));
            });
    })
}

function getPicLinks(restaurants) {
    return (dispatch) => {
        
        let rs = restaurants.map((r, i) => {
            r.links = [];
            //image names
            [1,2,3,4,9].map((n) => {
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
