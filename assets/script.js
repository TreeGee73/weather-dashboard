// Store the Search City Value & API Key, Set Data Variable
let city = $('#searchValue').val();
const apiKey = '&appid=554845f58eea39e31d7b61cfe4d53c53';
let date = new Date();

// Event Listener for Enter Key After City Name is Entered
// Executes On Click Function
$('#searchValue').keypress(function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        $('#searchBtn').click();
    }
});

// On Click Event Listener on Search Button after City Name is Entered
// Executes API Query for City and Returns Desired Values
$('#searchBtn').on('click', function() {
    $('#forecastH5');
    // Search Value from City Search Input
    city = $('#searchValue').val();
    // Clear City Input Box After Search is Initiated
    $('#searchValue').val('');

    // Execute API Search & Return Data
    $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + apiKey,
        method: 'GET'
    }).then(function(response){
        console.log(response)
        // Save Current City Search to a List in the Search Section on the HTML
        makeList();

        // Run Current Conditions Function & Display in 'Today' Section on HTML
        getCurrentConditions(response);

        // Run 5-Day Forecast Function & Display in '5-Day Forcast' Section on HTML
        getCurrentForecast(response);
    })
});

// Function to Create a List of Previously Searched Cities
function makeList() {
    let listItem = $('<li>').addClass('list-group-item list-item').text(city);
    $('.list').append(listItem);
}

// Function to Display the Weather for the Searched City for 'Today' in Main Section
function getCurrentConditions(response) {
    // Get and Convert Temperature to Degrees Farenheit
    let tempF = (response.main.temp - 273.15) * 1.80 + 32;
    // Rounds Temperature to the Nearest Degree
    tempF = Math.round(tempF);

    // Get Latitude and Longitude for Searched City
    let cityLon = response.coord.lon;
    let cityLat = response.coord.lat;

    $.ajax({
        url: `http://api.openweathermap.org/data/2.5/uvi?lat=${cityLat}&lon=${cityLon}&units=imperial&exclude=minutely,hourly${apiKey}`,
        method: 'GET',
    }).then(function (response) {
        console.log(response);
    })

    let uvi = (Math.round(response.value))
    console.log(uvi);

    //Change the background color of the UV Index to favorable(green), moderate(orange), and severe(red)
    // if (uvi <= 3) {
    //     $(".uvi").html('UV Index: <span class="UV-favorable">' + uvi + '</span>');
    // } else if (uvi <= 7) {
    //     $(".uvi").html('UV Index: <span class="UV-moderate">' + uvi + '</span>');
    // } else {
    //     $(".uvi").html('UV Index: <span class="UV-severe">' + uvi + '</span>');
    // }
    
    // Removes Existing Content & Child Nodes from the 'Today' Div
    $('#today').empty();
    
    // Get, Format, and Add Current Forcast Data to 'Today' Div
    $('#today').append(
        $('<img>').addClass('weather-img').attr('src', 'https://openweathermap.org/img/w/' + response.weather[0].icon + '.png'),
        $('<h4>').addClass('card-title').text(response.name),
        $('<h5>').addClass('card-title').text(date.toLocaleDateString('en-US')),
        $('<p>').addClass('card-text').text('Temperature: ' + tempF + ' °F'),
        $('<p>').addClass('card-text').text('Humidity: ' + response.main.humidity + '%'),
        $('<p>').addClass('card-text').text('Wind Speed: ' + response.wind.speed + ' MPH'),
        // $('<p>').addClass('card-text').text('UV Index: ' + uvi + ' of 10') <---Needs to be fixed to display value
        )
  }

// Function to Create and Display the 5-Day Forecast
function getCurrentForecast() {
    // Execute API Search & Return Data
    $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + apiKey,
        method: 'GET'
    }).then(function (response){
        // Removes Existing Content & Child Nodes from the '5-Day Forecast' Div
        $('#forecast').empty();
        // Set Variable to Collect Response Data
        let results = response.list;
        // Create For Loop to Capture Forecast Data for 'Today'+1 through 'Today'+5
      //declare start date to check against
      // startDate = 20
      //have end date, endDate = startDate + 5
      for (let i = 0; i < results.length; i++) {
        // Set Date/Time Variable  
        let day = Number(results[i].dt_txt.split('-')[2].split(' ')[0]);
        let hour = results[i].dt_txt.split('-')[2].split(' ')[1];

        // Get Data Based on Dates for Forecast
        if(results[i].dt_txt.indexOf('00:00:00') !== -1){
            // Get and Convert Temperature to Degrees Farenheit
            let tempF = (results[i].main.temp - 273.15) * 1.80 + 32;
            // Rounds Temperature to the Nearest Degree
           tempF = Math.round(tempF);

            // Get, Format, and Add Current Forcast Data to '5-Day Forecast' Div
            $('#forecast').append(
                $('<div>').addClass('card mr-2  ml-3 forecast-card').append(
                    $('<div>').addClass('card-body').append(
                        $('<h5>').addClass('card-title').text(date.toLocaleDateString('en-US')),
                        $('<img>').addClass('forecast-img').attr('src', 'https://openweathermap.org/img/w/' + results[i].weather[0].icon + '.png'),
                        $('<p>').addClass('card-text').text('Temperature: ' + tempF + ' °F'),
                        $('<p>').addClass('card-text').text('Humidity: ' + results[i].main.humidity + '%')
                    )
                )
            )
        }
    }
});
}