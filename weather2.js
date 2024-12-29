const apiKey = "fdb8d66094374fbbb768902b00ff8bd3"; // Replace with your OpenWeatherMap API key

async function getWeather() {
    const city = document.getElementById("cityInput").value;
    if (!city) {
        alert("Please enter a city name");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        document.getElementById("weatherInfo").innerHTML = data.name;
        document.getElementById("temperature").textContent = `${Math.round(data.main.temp)}°C`;
        document.getElementById("description").textContent = data.weather[0].description;
        document.getElementById("humidity").textContent = `${data.main.humidity}% Humidity`;
        document.getElementById("windSpeed").textContent = `${Math.round(data.wind.speed * 3.6)}Km/H Wind Speed`;

        // Set weather icon
    } catch (error) {
        alert(error.message);
    }
}// Function to update the time
function updateClock() {
    const timeElement = document.getElementById('time');
    
    // Get current date and time
    const now = new Date();
    
    // Extract hours, minutes, and seconds
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    
    // Add leading zeros if needed
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    
    // Display the time in HH:MM:SS format
    timeElement.textContent = `${hours}:${minutes}:${seconds}`;
}

// Update clock every 1000 milliseconds (1 second)
setInterval(updateClock, 1000);

// Initialize the clock right away
updateClock();
