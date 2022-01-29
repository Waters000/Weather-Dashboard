// make a request to the url



var tallahassee = document.getElementById('tallahassee');
var cityName = document.getElementById('cityname');
var submitBtnEl = document.getElementById('submitBtn');
var currentWeatherDiv = document.getElementById('current-weather');
var citySearch = document.getElementById('city-search-term');
var image = document.getElementById('image');
var cityWeatherEl = document.getElementById('city-weather');
var listGroupEl = document.querySelector(".list-group")
var cityListEl = document.querySelector(".city-list")
var buttonClickEl = document.querySelector(".btn")
var fiveDayEL = document.querySelector(".five-day")


var citiesListpast;
var currentMomentkey = moment().format('h:mm:ss a');
var cityKey = 0;
var lattitude;
var longitude;
var cityNameList;
var city;
var cityArr = [];


var apiKey = "e66db7319dc01000529ad3640c6a3281";

var getWeather = function (city) {
    // Single day weather info
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;

    fetch(apiUrl).then(function (response) {
        // request was success
        if (response.ok) {
            response.json().then(function (city) {
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


// change function to new name, new city, that passes

var cityListButton = function (event) {

    event.preventDefault();
    console.log(event.target.textContent)


    //var city = cityName.value.trim()
    var city = event.target.textContent;
    cityArr.push(city)
    if (city) {
        getWeather(city);
        //cityName.value = "";
    } else {
        alert("Please enter a City to search")
    }
};

/// takes city from the form and passes into getWeather function
var formCityName = function (city) {

    // event.preventDefault();
    // console.log(event.target.textContent)


    var city = cityName.value.trim()
    //city = event.target.textContent;
    cityArr.push(city)
    if (city) {
        getWeather(city);
        //cityName.value = "";
    } else {
        alert("Please enter a City to search")
    }

}

var displayWeather = function (city) {

    cityWeatherEl.innerHTML = "";
    listGroupEl.innerHTML = "";

    // console.log(city)
    /// adds city under the search list.
    var cityNameList = document.createElement('button')
    cityNameList.classList = " btn btn-dark mb-1 w-100";


    cityNameList.textContent = city.city.name;
    cityListEl.append(cityNameList)


    cityArr.push(city.city.name)

    localStorage.setItem("city-search", JSON.stringify(cityArr));

    // cityKey = cityKey + 1;

    var currentWeatherDiv = document.createElement('div')
    currentWeatherDiv.classList.add("bg",)

    var iconImage = document.createElement('img')
    $("#image").append(iconImage)
    iconImage.src = "https://openweathermap.org/img/wn/" + city.list[0].weather[0].icon + "@4x.png";


    var cityName = document.createElement('h2')
    cityName.classList = " flex-row align-left";
    cityName.textContent = city.city.name;
    var iconImage = document.createElement('img')
    iconImage.src = "https://openweathermap.org/img/wn/" + city.list[0].weather[0].icon + "@4x.png";
    var temperature = document.createElement('p')
    temperature.textContent = "Temperature: " + parseInt((((city.list[0].main.temp) - 273.15) * (9 / 5)) + 32) + "*F";
    var humidity = document.createElement('p')
    humidity.textContent = "Humity: " + city.list[0].main.humidity + "%";
    var windSpeed = document.createElement('p')
    windSpeed.textContent = "Wind Speed: " + parseInt(city.list[0].wind.speed) + " m/hr";
    var population = document.createElement('p')
    population.textContent = "Population: " + (city.city.population).toLocaleString("en-US") + " People.";

    currentWeatherDiv.append(cityName, iconImage, temperature, humidity, windSpeed, population)
    cityWeatherEl.append(currentWeatherDiv)



    var lat = city.city.coord.lat
    var lon = city.city.coord.lon

    var fiveDayApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;


    fetch(fiveDayApi).then(function (response) {
        // request was success
        if (response.ok) {
            response.json().then(function (secondFeed) {
                // adds UV to top part of weather
                var uvdiv = document.createElement('div')


                var uvIndex = document.createElement('p')

                uvIndex.textContent = "UV Index: " + parseInt(Math.floor(secondFeed.current.uvi))
                var uvi = parseInt(Math.floor(secondFeed.current.uvi));

                uvdiv.append(uvIndex)
                $("#city-weather").append(uvdiv)
                // uv scale ranges from 0 to 11 as high
                if (uvi <= 4) {
                    uvdiv.classList.add("green")
                } else if (uvi > 7) {
                    uvdiv.classList.add("red")
                } else {
                    uvdiv.classList.add("yellow")
                }








                for (var i = 0; i < 5; i++) {

                    var divWeather = document.createElement('div')
                    divWeather.classList.add("bg-primary",)

                    var fiveDayImage = document.createElement('img')
                    fiveDayImage.src = "https://openweathermap.org/img/wn/" + secondFeed.daily[i].weather[0].icon + "@2x.png";

                    var clouds = document.createElement('p');
                    clouds.setAttribute("width", "50px", "text-color:orange")
                    clouds.textContent = "clouds: " + secondFeed.daily[i].clouds + "%";
                    clouds.classList.add("temp")

                    var date = document.createElement('p')
                    date.setAttribute("width", "50px")
                    date.textContent = moment.unix(secondFeed.daily[i].dt).format("MM/DD/YYYY");
                    date.classList.add("temp")

                    var fiveDayTempLow = document.createElement('p')
                    fiveDayTempLow.setAttribute("width", "50px")
                    fiveDayTempLow.classList.add("temp")
                    fiveDayTempLow.textContent = "Low Temp: " + parseInt((((secondFeed.daily[i].temp.min) - 273.15) * (9 / 5)) + 32);

                    var fiveDayTempHigh = document.createElement('p')
                    fiveDayTempHigh.setAttribute("width", "50px")
                    fiveDayTempHigh.classList.add("temp")
                    fiveDayTempHigh.textContent = "High Temp: " + parseInt((((secondFeed.daily[i].temp.max) - 273.15) * (9 / 5)) + 32)

                    var dailyWeather = document.createElement('p');
                    dailyWeather.classList.add("temp")
                    dailyWeather.textContent = secondFeed.daily[i].weather[0].description



                    divWeather.append(date, fiveDayImage, dailyWeather, clouds, fiveDayTempLow, fiveDayTempHigh)

                    listGroupEl.appendChild(divWeather)



                };

                //  var UvIndex = data.value;
                console.log(secondFeed)

            });
        } else {
            alert("No Weather found");
        }
    })
        .catch(function (error) {

        })


}

var cityListNames = function () {




    var cityArr = (JSON.parse(localStorage.getItem("city-search")))

    for (var i = 0; i < cityArr.length; i++) {
        var citiesListpast = document.createElement("h2");
        citiesListpast.classList.add("btn", "btn-dark", "mb-1", "w-100")
        citiesListpast.textContent = cityArr[i];


        console.log(citiesListpast)
        citiesListpast.setAttribute("onClick", "cityListButton(event)")

        // citiesListpast.onclick = formCityName(event)

        $(".city-list").append(citiesListpast)


    }

}


cityListNames();

// listens for a click on the form
submitBtnEl.addEventListener('click', formCityName)
// buttonClickEl.addEventListener('click', formCityName);