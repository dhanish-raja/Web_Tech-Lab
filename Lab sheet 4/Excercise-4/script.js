const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const spinner = document.getElementById("spinner");
const weatherCard = document.getElementById("weatherCard");
const messageDiv = document.getElementById("message");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const condition = document.getElementById("condition");

// We should enter our weather API key – removed before pushing it to GitHub
const API_KEY = "YOUR_API_KEY_HERE";


let cache = {}; // Cache last searched city

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if (!city) return;

    // Check cache first
    if (cache[city]) {
        displayWeather(cache[city]);
        return;
    }

    fetchWeather(city);
});

function fetchWeather(city) {

    spinner.classList.remove("hidden");
    weatherCard.classList.add("hidden");
    messageDiv.textContent = "";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    fetch(url)
        .then(response => {
    if (!response.ok) {
        throw { status: response.status };
    }
    return response.json();
})

        .then(data => {

            cache[city] = data; // Save to cache
            displayWeather(data);
        })
        .catch(error => {
            handleError(error.status || 500);
        })
        .finally(() => {
            spinner.classList.add("hidden");
        });
}

function displayWeather(data) {

    cityName.textContent = data.name;
    temperature.textContent = data.main.temp + " °C";
    humidity.textContent = data.main.humidity + " %";
    condition.textContent = data.weather[0].description;

    weatherCard.classList.remove("hidden");
}

function handleError(status) {

    weatherCard.classList.add("hidden");

    if (status === 404) {
        messageDiv.textContent = "Invalid city name (404)";
    } else {
        messageDiv.textContent = "Network/Server error (500)";
    }

    messageDiv.className = "error";
}
