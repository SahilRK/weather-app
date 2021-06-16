const request = require('postman-request');

//Weather function
const getWeatherDetails = (latitude,longitude,callback) => {
    const weather_url = `http://api.weatherstack.com/current?access_key=3920b29c3ecb693b904c073e28a23683&query=${latitude},${longitude}`;

    request(
        {
            url:weather_url, 
            json:true     
        },(error,response)=> {
            if(error){
                callback("Unable to connect to the weather service. Check your network or the URL",undefined);
            }
            else if(response.body.error){
                callback("Unable to find the location",undefined);
            }
            else{
                const data = response.body.current;
                callback(undefined,{
                    message: `It is currently ${data.temperature}. It feels like ${data.feelslike} degrees out.`
                });
            }
    });
}

//Request accepts two parameters. 1) The API options in the form of an object. 2) A callback function to work on the data received from the response to the request.


module.exports = {
    getWeatherDetails: getWeatherDetails
}