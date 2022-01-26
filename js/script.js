// make a request to the url

var tallahassee = document.getElementById('tallahassee');
var cityName = document.getElementById('cityname');
var submitBtnEl = document.getElementById('submitBtn');
var weatherContainer = document.getElementById('weather-container');
var citySearch = document.getElementById('city-search-term');


var apiKey = "e66db7319dc01000529ad3640c6a3281";

var getWeather = function (city) {
    // 
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

    fetch(apiUrl).then(function (response) {
        // request was success
        if (response.ok) {
            response.json().then(function (city) {
                displayWeather(city);
              //  console.log(data)
            });
        } else {
            alert("No Weather found");
        }
    })
        .catch(function (error) {

        })
};

/// takes city from the form and passes into getWeather function
var formCityName = function (event) {
    event.preventDefault();
    var city = cityName.value.trim()

    if (city) {
        getWeather(city);
        cityName.value = "";
    } else {
        alert("Please enter a City to search")
    }

}

var displayWeather = function(city) {
    weatherContainer.textContent = "";
    citySearch.textContent = city.name;
    citySearch.textContent = city.main.temp;
    console.log(city)
// loop over city


}


// listens for a click on the form
submitBtnEl.addEventListener('click', formCityName);
