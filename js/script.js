// make a request to the url



var tallahassee = document.getElementById('tallahassee');
var cityName = document.getElementById('cityname');
var submitBtnEl = document.getElementById('submitBtn');
var weatherContainer = document.getElementById('weather-container');
var citySearch = document.getElementById('city-search-term');
var image = document.getElementById('image');


var currentMoment =  moment().format('dddd - MMM Do YY');

var lattitude;
var longitude;

var apiKey = "e66db7319dc01000529ad3640c6a3281";

var getWeather = function(city) {
    // 
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;

    fetch(apiUrl).then(function (response) {
        // request was success
        if (response.ok) {
            response.json().then(function(city) {
             //  console.log(response)
                displayWeather(city);
             
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
    console.log(city)
   
   var iconImage = document.createElement('img')
   $("#image").append(iconImage)
   iconImage.src = "https://openweathermap.org/img/wn/" + city.list[0].weather[0].icon +"@2x.png"

   var temperature = document.createElement('p')
   temperature.textContent =  "Temperature:" + city.list[0].main.temp
  var humidity = document.createElement('p')
  humidity.textContent = "Humity" + city.list[0].main.humidity
  var windSpeed = document.createElement('p')
  windSpeed.textContent = "Humity" + city.list[0].wind.speed
  var groundLevel = document.createElement('p')
  groundLevel.textContent = "UV" + city.list[0].main.grnd_level


  $(".list-weather").append(temperature, humidity, windSpeed, groundLevel )


  
    

    // let currentWeather = `
    // <h3>${city.city.name} ${currentMoment}<img src="${iconImage}"></h3>
    // <ul class="list-unstyled">
    //     <li>Temperature: ${city.city.name}&#8457;</li>
    //     <li>Humidity: ${city.city.sunrise}%</li>
    //     <li>Wind Speed: ${city.city.sunrise} mph</li>
    //     <li id="uvIndex">UV Index:</li>
    // </ul>`
  

   // weatherContainer = document.createElement("div");
   // weatherContainer.textContent = currentWeather;


   
  //  citySearch.textContent = city.main.temp;
//  image.textContent = iconImage
//  image.textContent = currentWeather


// citySearch.textContent = city['city']['name'];
//  image.setAttribute("src", "https://openweathermap.org/img/w/" + city['list'][0]['weather'][0]['icon'] + ".png")
//  image.setAttribute = city['list'][0]['main']['feels_like']
//   weatherContainer.textContent = city['list'][0]['weather']['icon'];
//   weatherContainer.textContent = city['city']['sunrise'];
//   weatherContainer.textContent = city['city']['sunrise'];
 
    
 

    // var weatherEl = document.createElement("a");
    // weatherEl.classList = "list-item flex-row justify-space-between align-center";
    // weatherEl.setAttribute("href",);

    // weatherEl.appendChild(weatherCity);

   // console.log(weatherCity)

   
// loop over city


}


// listens for a click on the form
submitBtnEl.addEventListener('click', formCityName);
