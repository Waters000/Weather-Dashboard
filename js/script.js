 // make a request to the url

 var tallahassee = document.getElementById('tallahassee');
 var cityName = document.getElementById('cityname');
 var submitBtnEl = document.getElementById('submitBtn');

var apiKey = "e66db7319dc01000529ad3640c6a3281";

var getWeather = function(city) {
    // 
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
     
    fetch(apiUrl).then(function (response) {
        // request was success
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data)
            });
        } else {
            alert("No Weather found");
        }
    })
    };

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




submitBtnEl.addEventListener('click', formCityName);
