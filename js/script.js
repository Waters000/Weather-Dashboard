 // make a request to the url

 var tallahassee = document.getElementById('tallahassee');
 var cityName = document.getElementById('cityname');
 var submitBtnEl = document.getElementById('submitBtn');

var apiKey = "e66db7319dc01000529ad3640c6a3281";


var formCityName = function (event) {
    event.preventDefault();

    var city = cityName.value.trim()

    if (city) {
        getWeather(city);
        cityName.value = "";
    } else {
        alert("Please enter a City to search")
    }
    console.log(event);
}


function getWeather() {
// 
var apiUrl = "https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=50&lon=50&appid=e66db7319dc01000529ad3640c6a3281"
 
fetch(apiUrl).then(function (response) {
    return response.json();
})
.then(function(data){
    console.log(data)
})
    // request was success
    if (response.ok) {
        response.json().then(function (data) {
            displayRepos(data, user);
        });
    } else {
        alert("No Weather found");
    }

};

submitBtnEl.addEventListener('submit', formCityName);
