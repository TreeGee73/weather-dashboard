$(document).ready(function(){
    $('#search-button').on('click', function() {
        let city = $('#search-value').val();
        // Clear the search box text
        $('#search-value').val('');
    searchWeather(city);
    });

    $('.history').on('click', 'li', function() {
        searchWeather($(this).text());
    });

    function makeRow(text) {
        let li = $('<li>').addClass('list-group-item list-group-item-action').text(text);
        $('.history').append(li);
    }
});

    function searchWeather(city) {
        $.ajax({
            type: 'GET',
            url: queryUrl,
            dataType: 'json',
            success: function(data) {
                // 
                if (history.indexOf(city) === -1) {
                    history.push(city);
                    window.localStorage.setItem('history', JSON.stringify(history));

                    makeRow(city);
                }

                // Clear
                $('#today').empty();

                // 
                var title = $('<h3>').addClass('card-title').text(data.name + ' (' + new Date().toLocaleDateString() + ')');
                var card = $('<div>').addClass('card');
                var wind = $('<p>').addClass('card-text').text('Wind Speed: ' + data.wind.speed + 'mph');
                var humid = $('<p>').addClass('card-text').text('Humidity: ' + data.main.humidity + '%');
                var temp = $('<p>').addClass('card-text').text('Temperature: ' + data.main.temp + ' &ordm; F');
                var cardBody = $('<div>').addClass('card-body');
                var img = $('<img>').attr('src', 'https://openweathermap.org/img/wn/' + data.weather[0].icon + "@2x.png");

                // Merge content and add to page
                title.append(img);
                cardBody.append(title, temp, humid, wind);
                card.append(cardBody);
                $('#today').append(card);

                // Follow-up api endoint calls
                getForcast(city);
                getUVIndex(data.cord.lat, data.coord.lon);
            }
        });
    }

    function getForcast(city) {        const apikey = "554845f58eea39e31d7b61cfe4d53c53";         const query = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=imperial`;
    $.ajax({
        type: 'GET',
        url: query,
        dataType: 'json',
        success: function(data) {
            // Replace existing content
            $('#forecast').html('<h5 class=\'mt-3\'>5-Day Forecast:</h5>').append('<div class=\'row\'>');

            // 3-Hour forcast loop
            for (var i = 0; i < data.list.length; i++) {
                // Look at forecasts around 9:00am
                if (data.list[i].dt_text.indexOf('09:00:00') !== -1) {
                    // create card elements
                    var col = $('<div>').addClass('col-md-2');
                    var card = $('<div>').addClass('card');




                    var title = $('<h1>').addClass('card-text').text(data.list[i].date_text);
                    var img = $('<img>').attr('src', 'https://openweathermap.org/img/w/' + data.weather[0].icon);
                    var p1 = $('<p>').addClass('card-text').text('Temperature: ' + data.main.temp + ' &ordm; F');
                    var p2 = $('<p>').addClass('card-text').text('Humidity: ' + data.list[i].main.humidity + '%');

                    // Merge content and add to page
                    col.append(card.append(body.append(title, img, p1, p2)));
                    $('forecast .row').append(col);
                }
            }
        }
        });
    }

    function getUVIndex(lat, lon) {        const apikey = "554845f58eea39e31d7b61cfe4d53c53";         const query = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=imperial`;
    $.ajax({
        type: 'GET',
        url: query,
        dataType: 'json',
        success: function(data) {
            var uv = $('<p>').text('UV Index: ');
            var btn = $('<span>').addClass('btn btn-sm').text(data.value);

            // UV value set color
            if (data.value < 3) {
                btn.addClass('btn-success');
            } 
            else if (data.value < 7) {
                btn.addClass('btn-warning');
            } 
            else {
                btn.addClass('btn-danger');
            }

            $('#today.cardbody').append(uv.append(btn));
        }
        })
    }// store the value of the input
let city = $("#searchTerm").val();
// store api key
const apiKey = "&appid=afaa8eea1769b4359fd8e07b2efcefbd";

let date = new Date();

$("#searchTerm").keypress(function(event) { 
	
	if (event.keyCode === 13) { 
		event.preventDefault();
		$("#searchBtn").click(); 
	} 
});

$("#searchBtn").on("click", function() {

  $('#forecastH5').addClass('show');

  // get the value of the input from user
  city = $("#searchTerm").val();
  
  // clear input box
  $("#searchTerm").val("");  

  // full url to call api
  const queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;

  $.ajax({
    url: queryUrl,
    method: "GET"
  })
  .then(function (response){

    console.log(response)

    console.log(response.name)
    console.log(response.weather[0].icon)

    let tempF = (response.main.temp - 273.15) * 1.80 + 32;
    console.log(Math.floor(tempF))

    console.log(response.main.humidity)

    console.log(response.wind.speed)

    getCurrentConditions(response);
    getCurrentForecast(response);
    makeList();

    })
  });

  function makeList() {
    let listItem = $("<li>").addClass("list-group-item").text(city);
    $(".list").append(listItem);
  }

  function getCurrentConditions (response) {

    // get the temperature and convert to fahrenheit 
    let tempF = (response.main.temp - 273.15) * 1.80 + 32;
    tempF = Math.floor(tempF);

    $('#currentCity').empty();

    // get and set the content 
    const card = $("<div>").addClass("card");
    const cardBody = $("<div>").addClass("card-body");
    const city = $("<h4>").addClass("card-title").text(response.name);
    const cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
    const temperature = $("<p>").addClass("card-text current-temp").text("Temperature: " + tempF + " °F");
    const humidity = $("<p>").addClass("card-text current-humidity").text("Humidity: " + response.main.humidity + "%");
    const wind = $("<p>").addClass("card-text current-wind").text("Wind Speed: " + response.wind.speed + " MPH");
    const image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")

    // add to page
    city.append(cityDate, image)
    cardBody.append(city, temperature, humidity, wind);
    card.append(cardBody);
    $("#currentCity").append(card)
   
  }

function getCurrentForecast () {
  
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + apiKey,
    method: "GET"
  }).then(function (response){

    console.log(response)
    console.log(response.dt)
    $('#forecast').empty();

    // variable to hold response.list
    let results = response.list;
    console.log(results)
    
    //declare start date to check against
    // startDate = 20
    //have end date, endDate = startDate + 5

    for (let i = 0; i < results.length; i++) {

      let day = Number(results[i].dt_txt.split('-')[2].split(' ')[0]);
      let hour = results[i].dt_txt.split('-')[2].split(' ')[1];
      console.log(day);
      console.log(hour);

      if(results[i].dt_txt.indexOf("12:00:00") !== -1){
        
        // get the temperature and convert to fahrenheit 
        let temp = (results[i].main.temp - 273.15) * 1.80 + 32;
        let tempF = Math.floor(temp);

        const card = $("<div>").addClass("card col-md-2 ml-4 bg-primary text-white");
        const cardBody = $("<div>").addClass("card-body p-3 forecastBody")
        const cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
        const temperature = $("<p>").addClass("card-text forecastTemp").text("Temperature: " + tempF + " °F");
        const humidity = $("<p>").addClass("card-text forecastHumidity").text("Humidity: " + results[i].main.humidity + "%");

        const image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + results[i].weather[0].icon + ".png")

        cardBody.append(cityDate, image, temperature, humidity);
        card.append(cardBody);
        $("#forecast").append(card);

      }
    }
  });

}