const apiKey = "fdb8d66094374fbbb768902b00ff8bd3"; // Replace with your OpenWeatherMap API key

// Function to get weather icon based on weather condition
function getWeatherIcon(weatherMain, weatherDescription, temp) {
    const main = weatherMain.toLowerCase();
    const description = weatherDescription.toLowerCase();
    
    // Hot weather (temperature above 30°C)
    if (temp > 30) {
        return "https://img.icons8.com/fluency/96/sun.png";
    }
    
    // Rain conditions
    if (main.includes('rain') || description.includes('rain') || description.includes('drizzle')) {
        return "https://img.icons8.com/fluency/96/rain.png";
    }
    
    // Thunderstorm
    if (main.includes('thunderstorm') || description.includes('thunderstorm')) {
        return "https://img.icons8.com/fluency/96/storm.png";
    }
    
    // Snow conditions
    if (main.includes('snow') || description.includes('snow')) {
        return "https://img.icons8.com/fluency/96/snow.png";
    }
    
    // Cloudy conditions
    if (main.includes('cloud') || description.includes('cloud') || description.includes('overcast')) {
        return "https://img.icons8.com/fluency/96/clouds.png";
    }
    
    // Mist, fog, haze
    if (main.includes('mist') || main.includes('fog') || main.includes('haze') || 
        description.includes('mist') || description.includes('fog') || description.includes('haze')) {
        return "https://img.icons8.com/fluency/96/fog.png";
    }
    
    // Clear sky
    if (main.includes('clear') || description.includes('clear')) {
        return "https://img.icons8.com/fluency/96/sun.png";
    }
    
    // Default fallback - partly cloudy
    return "https://img.icons8.com/fluency/96/partly-cloudy-day.png";
}

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
        const temperature = Math.round(data.main.temp);
        
        document.getElementById("weatherInfo").innerHTML = data.name;
        document.getElementById("temperature").textContent = `${temperature}°C`;
        document.getElementById("description").textContent = data.weather[0].description;
        document.getElementById("humidity").textContent = `${data.main.humidity}% Humidity`;
        document.getElementById("windSpeed").textContent = `${Math.round(data.wind.speed * 3.6)}Km/H Wind Speed`;

        // Set dynamic weather icon
        const weatherIcon = document.getElementById("weatherIcon");
        const iconUrl = getWeatherIcon(data.weather[0].main, data.weather[0].description, temperature);
        weatherIcon.src = iconUrl;
        weatherIcon.alt = data.weather[0].description;
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

// Add event listener for Enter key on input field
document.addEventListener('DOMContentLoaded', function() {
    const cityInput = document.getElementById('cityInput');
    
    cityInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission if inside a form
            getWeather();
        }
    });
    
    // Also add keydown event for better compatibility
    cityInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            getWeather();
        }
    });
});
