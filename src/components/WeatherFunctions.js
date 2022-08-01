import { DateTime } from "luxon";

const apiKey = "e6620fd9081a23cc5aed1ebaf174c2e2";
const apiURL = "https://api.openweathermap.org/data/2.5/"

//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
// change weather to onecall for forecasts

const fetchWeather = async (info, params) => {

    // determines if getting current or forecast weather
    const url = new URL(apiURL + info);

    // adds data and key
    url.search = new URLSearchParams({...params, appid:apiKey});    
    return fetch(url).then((response) => response.json()).then((data) => data);
};

const fixCurrentWeather = (data) => {

    // get all of the data from the api json
    const {
        coord: {lat, lon},
        main: {temp, feels_like, temp_min, temp_max, pressure, humidity},
        wind: {speed},
        name,
        dt,
        weather,
        timezone,
        sys: {country}
    } = data;

    // weather description
    const {main: description} = weather[0];

    return {lat, lon, temp, feels_like, temp_min, temp_max, pressure, humidity, speed, 
            name, dt, timezone, country, description};
}

const fixForecastWeather = (data) => {

    // get daily and hourly forecast with the time
    let {timezone, daily, hourly} = data;

    // only keep the next seven days for daily forecast
    daily = daily.slice(1, 8).map(day => {
        return {
            /// ccc format is abbreviated day
            title: getTime(day.dt, timezone, "ccc"),
            temp: day.temp.day,
            description: day.weather[0].description,
        };
    });

    // only keep the next 8 hours
    hourly = hourly.slice(1, 9).map(hour => {
        return {
            /// format is time like 4:00
            title: getTime(hour.dt, timezone, "hh:mm a"),
            temp: hour.temp,
            description: hour.weather[0].description,
        };
    });

    return {timezone, daily, hourly};
};

const cleanWeatherData = async (params) => {

    // send data to fix current weather to be cleaned up
    const cleanedWeatherData = await fetchWeather('weather', params).then(fixCurrentWeather);

    // use lat and lon to call onecall api for forecast data
    const {lat, lon} = cleanedWeatherData;
    const cleanedWeatherForecast = await fetchWeather('onecall', {
        // remove what we dont want and use the selected units
        lat, lon, exclude: 'current,minutely,alerts', units: params.units
    }).then(fixForecastWeather);
    
    // return all needed weather data
    return {...cleanedWeatherData, ...cleanedWeatherForecast};
};

// use luxon to get and format time based on the timezone in the format we want displayed
const getTime = (seconds, timezone, format) => {
    return DateTime.fromSeconds(seconds).setZone(timezone).toFormat(format);
};

export default cleanWeatherData;