# weather-dashboard

Developers are often tasked with retrieving data from another application's API and using it in the context of their own. Third-party APIs allow developers to access their data and functionality by making requests with specific parameters to a URL. Your challenge is to build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS.

Use the [OpenWeather API](https://openweathermap.org/api) to retrieve weather data for cities. The documentation includes a section called "How to start" that will provide basic setup and usage instructions. Use `localStorage` to store any persistent data.

## Motivation / Project Criteria

AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly

GIVEN a weather dashboard with form inputs
WHEN I search for a city
[x] I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
[x] I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
[] I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
[x] I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
[x] I am again presented with current and future conditions for that city
WHEN I open the weather dashboard
[x] I am presented with the last searched city forecast

## Approach

This project was completed using a combination of prebuilt technology (Bootstrap, JavaScript, JQuery) and custom built solutions to achieve a web page that will allow a user to input the name of a city and get weather and forecasted conditions for that location.

![](https://media.giphy.com/media/O2AvBh6vHxwyxWGXPk/giphy.gif)


## Improvements

The page was built to provide UV Index information and store a search history. Improvements include converting search history to buttons that will display the data for the historical city and adding the ability to search by city & state to better ensure the information provided is for the desired city (i.e. Wilmington, DE vs Wilmington, NC). Additionally, once fixed and available, adding UV Index information to the 5-Day forecast section as well.

## Technology

This app utilizes [Bootstrap](https://getbootstrap.com/) for CSS framework, [Google Fonts](https://fonts.google.com/), [JavaScript](https://www.javascript.com/), [JQuery](https://jquery.com/), and the [OpenWeather](https://openweathermap.org/) API.

## Link

This app can be accessed at [https://treegee73.github.io/weather-dashboard/](https://treegee73.github.io/weather-dashboard/)

## Credits
Background image is a free to use image that was obtained from [Pexels.com](https://www.pexels.com/).