// Variables
    let date = new Date();

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
    const apikey = "554845f58eea39e31d7b61cfe4d53c53";
    const queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`
        // const query = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=imperial`;
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
                var img = $('<img>').attr('src', 'https://openweathermap.org/img/wn//' + data.weather[0].icon + "@2x.png");

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
    }