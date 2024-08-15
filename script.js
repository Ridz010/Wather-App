const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');

const APIKey = 'a162f04c39825f04b78c36e675f3965e';

search.addEventListener('click', () => {
    const cityInput = document.querySelector('.search-box input');
    const city = cityInput.value.trim();

    if (!city) return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod == '404') {
                showError(city);
            } else {
                showWeatherInfo(city, json);
            }
        });
});

function showError(city) {
    cityHide.textContent = city;
    container.style.height = '400px';
    weatherBox.classList.remove('active');
    weatherDetails.classList.remove('active');
    error404.classList.add('active');
}

function showWeatherInfo(city, json) {
    const temperature = document.querySelector('.weather-box .temperature');
    const description = document.querySelector('.weather-box .description');
    const humidity = document.querySelector('.weather-details .humidity span');
    const wind = document.querySelector('.weather-details .wind span');

    if (cityHide.textContent !== city) {
        cityHide.textContent = city;
        container.style.height = '555px';
        container.classList.add('active');
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        error404.classList.remove('active');
    }

    setWeatherImage(json.weather[0].main);
    temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
    description.innerHTML = `${json.weather[0].description}`;
    humidity.innerHTML = `${json.main.humidity}%`;
    wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
}

function setWeatherImage(weatherMain) {
    const image = document.querySelector('.weather-box img');
    const weatherImages = {
        'Clear': 'images/clear.png',
        'Rain': 'images/rain.png',
        'Snow': 'images/snow.png',
        'Clouds': 'images/cloud.png',
        'Mist': 'images/mist.png',
        'Haze': 'images/mist.png',
    };

    image.src = weatherImages[weatherMain] || 'images/cloud.png';
}

function cloneAndAnimateInfo(selector) {
    const infoElement = document.querySelector(selector);
    const clone = infoElement.cloneNode(true);
    const cloneId = `clone-${selector.slice(1)}`;

    clone.id = cloneId;
    clone.classList.add('active-clone');

    setTimeout(() => {
        infoElement.insertAdjacentElement('afterend', clone);
    }, 800);

    const cloneElements = document.querySelectorAll(`.${selector.slice(1)}.active-clone`);
    const totalCloneElements = cloneElements.length;
    const cloneFirst = cloneElements[0];

    if (totalCloneElements > 0) {
        cloneFirst.classList.remove('active-clone');
        setTimeout(() => {
            cloneFirst.remove();
        }, 800);
    }
}
