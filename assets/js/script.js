var btnAtlanta = document.querySelector('#Atlanta');
var CityButtonsEl = document.querySelector('.city-button-container');

var cityNameEl = document.querySelector('.cityName');
var currentTempEl = document.querySelector('#currentTemp');
var currentWindEl = document.querySelector('#currentWind');
var currentHumidityEl = document.querySelector('#currentHumidity');
var day1DateEl = document.querySelector('#day1Date');
var day1IconEl = document.querySelector('#day1Icon');
var day1TempEl = document.querySelector('#day1Temp');
var day1WindEl = document.querySelector('#day1Wind');
var day1HumidityEl = document.querySelector('#day1Humidity');
var day2DateEl = document.querySelector('#day2Date');
var day2IconEl = document.querySelector('#day2Icon');
var day2TempEl = document.querySelector('#day2Temp');
var day2WindEl = document.querySelector('#day2Wind');
var day2HumidityEl = document.querySelector('#day2Humidity');
var day3DateEl = document.querySelector('#day3Date');
var day3IconEl = document.querySelector('#day3Icon');
var day3TempEl = document.querySelector('#day3Temp');
var day3WindEl = document.querySelector('#day3Wind');
var day3HumidityEl = document.querySelector('#day3Humidity');
var day4DateEl = document.querySelector('#day4Date');
var day4IconEl = document.querySelector('#day4Icon');
var day4TempEl = document.querySelector('#day4Temp');
var day4WindEl = document.querySelector('#day4Wind');
var day4HumidityEl = document.querySelector('#day4Humidity');
var day5DateEl = document.querySelector('#day5Date');
var day5IconEl = document.querySelector('#day5Icon');
var day5TempEl = document.querySelector('#day5Temp');
var day5WindEl = document.querySelector('#day5Wind');
var day5HumidityEl = document.querySelector('#day5Humidity');
var userFormEl = document.querySelector('#user-form');
var nameInputEl = document.querySelector('#cityNameInput');

var city1El = document.querySelector('#city1');
var city2El = document.querySelector('#city2');
var city3El = document.querySelector('#city3');
var city4El = document.querySelector('#city4');
var city5El = document.querySelector('#city5');
var city6El = document.querySelector('#city6');
var city7El = document.querySelector('#city7');
var city8El = document.querySelector('#city8');

//If a valid city name, change all the history buttons, call "getCityData"
var formSubmitHandler = function (event) {
    event.preventDefault();
    console.log(event)
    var city = nameInputEl.value;
    console.log(city)
    var apiUrlLatLon = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+apiKey
    fetch(apiUrlLatLon).then(function (response) {
        console.log(response)
    if (response.ok){
        getCityData(city);

        //Edit all the buttons
        city8El.setAttribute('city',city7El.textContent)
        city8El.textContent = city7El.textContent
        city7El.setAttribute('city',city6El.textContent)
        city7El.textContent = city6El.textContent
        city6El.setAttribute('city',city5El.textContent)
        city6El.textContent = city5El.textContent
        city5El.setAttribute('city',city4El.textContent)
        city5El.textContent = city4El.textContent
        city4El.setAttribute('city',city3El.textContent)
        city4El.textContent = city3El.textContent
        city3El.setAttribute('city',city2El.textContent)
        city3El.textContent = city2El.textContent
        city2El.setAttribute('city',city1El.textContent)
        city2El.textContent = city1El.textContent
        city1El.setAttribute('city',city)
    city1El.textContent = city

    localStorage.setItem('city1', city1El.textContent)
    localStorage.setItem('city2', city2El.textContent)
    localStorage.setItem('city3', city3El.textContent)
    localStorage.setItem('city4', city4El.textContent)
    localStorage.setItem('city5', city5El.textContent)
    localStorage.setItem('city6', city6El.textContent)
    localStorage.setItem('city7', city7El.textContent)
    localStorage.setItem('city8', city8El.textContent)
    } 
    else {
      alert('Please enter a valid city name');
    }
})
  };

//Function that gets the city name and runs getCityData
var buttonClickHandler = function (event) {
    var city = event.target.getAttribute('city');
    //Funtion that gets the current conditions and 5-day forecast
    getCityData(city);
  };

  //Function that calls the open weather API to get lat/lon of city, then calls Open Weather API again to get weather conditions for that lat/lon. Runs two functions to display current and forecast weather data: displayCurrentCityData and displayForecastCityData. 
  var getCityData = function (city) {
    //city = 'Atlanta, GA'
    apiKey = '3ac0944df85903a784436e17ffef830c'
    var apiUrlLatLon = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+apiKey
    fetch(apiUrlLatLon).then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
          lat = data.coord.lat.toFixed(2);
          lon = data.coord.lon.toFixed(2);
        
          var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lon+'&appid='+apiKey+'&units=imperial'
            fetch(apiUrl).then(function (response) {
              if (response.ok) {
                response.json().then(function (data) {
                displayCurrentCityData(data);
                displayForecastCityData(data);
                });
              } else {
                alert('Error: ' + response.statusText);
              }
            });
        });
        } else {
          alert('Error: ' + response.statusText);
        }
      });
  };


//Displays the current weather data. 
var displayCurrentCityData = function (data) {
    var cityName = data.city.name
    var currentHumidity = data.list[0].main.humidity+"%"
    var currentTemp = data.list[0].main.temp.toFixed(2)+"F"
    currentWindSpeed = data.list[0].wind.speed+" MPH"
    currentIcon = data.list[0].weather[0].icon

    var icon = document.createElement("img")
    icon.setAttribute("src","https://openweathermap.org/img/wn/"+currentIcon+".png")

    cityNameEl.textContent = cityName
    cityNameEl.append(icon)

    currentTempEl.textContent = "Temp: "+currentTemp
    currentWindEl.textContent = "Wind: "+currentWindSpeed
    currentHumidityEl.textContent = "Humidity: "+currentHumidity
}

//Displays the forecast weather data. 
var displayForecastCityData = function (data) {
    console.log(data)
    currentTime = dayjs()
    currentTime = dayjs(currentTime).format('M/D/YYYY HH')
    time1Day = dayjs().add(1, 'day')
    time2Day = dayjs().add(2, 'day')
    time3Day = dayjs().add(3, 'day')
    time4Day = dayjs().add(4, 'day')
    time5Day = dayjs().add(5, 'day')

    //Day 1 Forecast
    for(i=0;i<data.list.length;i++){
        time = data.list[i].dt_txt
        if(dayjs(time).format("M") === dayjs(time1Day).format("M") && dayjs(time).format("D") === dayjs(time1Day).format("D") && dayjs(time).format("H") === "21"){
            day1DateEl.textContent = dayjs(time).format("M/D/YYYY")

            day1Humidity = data.list[0].main.humidity+"%"
            day1Temp = data.list[0].main.temp.toFixed(2)+"F"
            day1WindSpeed = data.list[0].wind.speed+" MPH"
            day1Icon = data.list[0].weather[0].icon
        
            icon = document.createElement("img")
            icon.setAttribute("src","https://openweathermap.org/img/wn/"+day1Icon+".png")
            day1IconEl.textContent = ""
            day1IconEl.append(icon)
                
            day1TempEl.textContent = "Temp: "+day1Temp
            day1WindEl.textContent = "Wind: "+day1WindSpeed
            day1HumidityEl.textContent = "Humidity: "+day1Humidity
        }
    }

    //Day 2 Forecast
    for(i=0;i<data.list.length;i++){
        time = data.list[i].dt_txt
        if(dayjs(time).format("M") === dayjs(time2Day).format("M") && dayjs(time).format("D") === dayjs(time2Day).format("D") && dayjs(time).format("H") === "21"){
            console.log("HIT")
            day2DateEl.textContent = dayjs(time).format("M/D/YYYY")

            day2Humidity = data.list[i].main.humidity+"%"
            day2Temp = data.list[i].main.temp.toFixed(2)+"F"
            day2WindSpeed = data.list[i].wind.speed+" MPH"
            day2Icon = data.list[i].weather[0].icon
        
            icon = document.createElement("img")
            icon.setAttribute("src","https://openweathermap.org/img/wn/"+day2Icon+".png")
            day2IconEl.textContent = ""
            day2IconEl.append(icon)

            day2TempEl.textContent = "Temp: "+day2Temp
            day2WindEl.textContent = "Wind: "+day2WindSpeed
            day2HumidityEl.textContent = "Humidity: "+day2Humidity
        }
    }
    //Day 3 Forecast
    for(i=0;i<data.list.length;i++){
        time = data.list[i].dt_txt
        if(dayjs(time).format("M") === dayjs(time3Day).format("M") && dayjs(time).format("D") === dayjs(time3Day).format("D") && dayjs(time).format("H") === "21"){
            console.log("HIT")
            day3DateEl.textContent = dayjs(time).format("M/D/YYYY")

            day3Humidity = data.list[i].main.humidity+"%"
            day3Temp = data.list[i].main.temp.toFixed(2)+"F"
            day3WindSpeed = data.list[i].wind.speed+" MPH"
            day3Icon = data.list[i].weather[0].icon
        
            icon = document.createElement("img")
            icon.setAttribute("src","https://openweathermap.org/img/wn/"+day3Icon+".png")
            day3IconEl.textContent = ""
            day3IconEl.append(icon)

            day3TempEl.textContent = "Temp: "+day3Temp
            day3WindEl.textContent = "Wind: "+day3WindSpeed
            day3HumidityEl.textContent = "Humidity: "+day3Humidity
        }
    }
    //Day 4 Forecast
    for(i=0;i<data.list.length;i++){
    time = data.list[i].dt_txt
    if(dayjs(time).format("M") === dayjs(time4Day).format("M") && dayjs(time).format("D") === dayjs(time4Day).format("D") && dayjs(time).format("H") === "21"){
        console.log("HIT")
        day4DateEl.textContent = dayjs(time).format("M/D/YYYY")

        day4Humidity = data.list[i].main.humidity+"%"
        day4Temp = data.list[i].main.temp.toFixed(2)+"F"
        day4WindSpeed = data.list[i].wind.speed+" MPH"
        day4Icon = data.list[i].weather[0].icon

        icon = document.createElement("img")
        icon.setAttribute("src","https://openweathermap.org/img/wn/"+day4Icon+".png")
        day4IconEl.textContent = ""
        day4IconEl.append(icon)

        day4TempEl.textContent = "Temp: "+day4Temp
        day4WindEl.textContent = "Wind: "+day4WindSpeed
        day4HumidityEl.textContent = "Humidity: "+day4Humidity
    }
    }

    //Day 5 Forecast
    for(i=0;i<data.list.length;i++){
    time = data.list[i].dt_txt
    if(dayjs(time).format("M") === dayjs(time5Day).format("M") && dayjs(time).format("D") === dayjs(time5Day).format("D") && dayjs(time).format("H") === "21"){
        console.log("HIT")
        day5DateEl.textContent = dayjs(time).format("M/D/YYYY")

        day5Humidity = data.list[i].main.humidity+"%"
        day5Temp = data.list[i].main.temp.toFixed(2)+"F"
        day5WindSpeed = data.list[i].wind.speed+" MPH"
        day5Icon = data.list[i].weather[0].icon

        icon = document.createElement("img")
        icon.setAttribute("src","https://openweathermap.org/img/wn/"+day5Icon+".png")
        day5IconEl.textContent = ""
        day5IconEl.append(icon)

        day5TempEl.textContent = "Temp: "+day5Temp
        day5WindEl.textContent = "Wind: "+day5WindSpeed
        day5HumidityEl.textContent = "Humidity: "+day5Humidity
    }
    }

}


//Starter code: Run starter code for last searched city. If nothing in local storage, runs for Atlanta. 
for (let i = 1; i <= 8; i++) {
    var cityEl = document.getElementById(`city${i}`);
    storedCity = localStorage.getItem(`city${i}`);
    if (storedCity !== null) {
      cityEl.textContent = storedCity;
      cityEl.setAttribute('city',cityEl.textContent)
      if(i===1){
          console.log("YES")
          console.log(storedCity)
        getCityData(storedCity)
      }
    }
    else{
        getCityData("Atlanta")
    }
  }

//Event Listeners
 CityButtonsEl.addEventListener('click', buttonClickHandler);
 userFormEl.addEventListener('submit', formSubmitHandler);
