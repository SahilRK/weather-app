const request = require('postman-request');

const getLocationDetails = (address,callback) => {
    const map_url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic2FoaWxyayIsImEiOiJja3BkdTR1ZHgwYTJjMm9vMWFqaXN6NWtlIn0.haVSarijEz0glyWBduj8bQ&limit=1`

    request({
        url: map_url,
        json: true
    },(error,response) => {
        if(error){
            callback("Unable to connect to the geocoding service. Check your network or the URL",undefined);
        }
        else if(response.body.features.length === 0){
            callback("Unable to get location coordinates for the specified location",undefined);
        }
        else{
            const data = response.body.features[0];
            const latitude = data.center[1];
            const longitude = data.center[0];
            const location = data.place_name;
            callback(undefined,{
                message: `Latitude is ${latitude} and Longitude is ${longitude} and placename is ${location}`,
                latitude,
                longitude
            });
        }
    })
}

module.exports = {
    getLocationDetails: getLocationDetails
}