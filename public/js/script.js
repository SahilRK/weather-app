const weather_form = document.querySelector(".weather-form");
const search_value = document.querySelector("#weather_city_location");
const content_wrapper = document.querySelector("#content_wrapper");
const loader_wrapper = document.querySelector("#loader_wrapper");
const location_message = document.querySelector("#location-success");
const forecast_message = document.querySelector("#forecast-success");
const error_message = document.querySelector("#location-error");

weather_form.addEventListener('submit',(e) => {
    e.preventDefault();

    loader_wrapper.style.display = "block";
    content_wrapper.style.display = "none";


    fetch(`/weather?location=${search_value.value}`).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                loader_wrapper.style.display = "none";
                content_wrapper.style.display = "block";
                location_message.textContent = "";
                location_message.style.display = "none";
                forecast_message.textContent = "";
                forecast_message.style.display = "none";
                error_message.style.display = "block";
                error_message.textContent = data.error;
            }
            else{
                loader_wrapper.style.display = "none";
                content_wrapper.style.display = "block";
                error_message.textContent = "";
                error_message.style.display = "none";
                location_message.style.display = "block";
                forecast_message.style.display = "block";
                location_message.textContent = data.geocodeMessage;
                forecast_message.textContent = data.forecastMessage;
            }
        })
    })
})