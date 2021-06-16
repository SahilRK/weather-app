const weather_form = document.querySelector(".weather-form");
const search_value = document.querySelector("#weather_city_location");
const location_message = document.querySelector("#location-success");
const forecast_message = document.querySelector("#forecast-success");
const error_message = document.querySelector("#location-error");

weather_form.addEventListener('submit',(e) => {
    e.preventDefault();

    fetch(`/weather?location=${search_value.value}`).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                console.log(data.error);
                location_message.textContent = ""
                location_message.style.dislplay = "none";
                forecast_message.textContent = ""
                forecast_message.style.dislplay = "none";
                error_message.style.dislplay = "block";
                error_message.textContent = data.error;
            }
            else{
                console.log(data)
                error_message.textContent = ""
                error_message.style.dislplay = "none";
                location_message.style.dislplay = "block";
                forecast_message.style.dislplay = "block";
                location_message.textContent = data.geocodeMessage;
                forecast_message.textContent = data.forecastMessage;
            }
        })
    })
})