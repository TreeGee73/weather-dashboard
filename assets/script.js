// Store the Search City Value & API Key, Set Data Variable
let city = $("#searchValue").val();
const apiKey = "&appid=554845f58eea39e31d7b61cfe4d53c53";
let date = new Date();

// Event Listener for Enter Key After City Name is Entered
// Executes On Click Function
$("#searchValue").keypress(function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        $("#searchBtn").click();
    }
});

// On Click Event Listener on Search Button after City Name is Entered
// Executes API Query for City and Returns Desired Values
$("#searchBtn").on("click", function() {
    $('#forecastH5').addClass('show');
    // Search Value from City Search Input
    city = $("#searchValue").val();
    // Clear City Input Box After Search is Initiated
    $("#searchValue").val("");

    // Execute API Search & Return Data
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey,
        method: "GET"
    }).then(function(response){
        // Save Current City Search to a List in the Search Section on the HTML
        makeList();
    })
});

// Function to Create a List of Previously Searched Cities
function makeList() {
    let listItem = $("<li>").addClass("list-group-item list-item").text(city);
    $(".list").append(listItem);
}