import React from 'react';
import ReactDOM from 'react-dom';

// import WeatherApp from './components/WeatherApp.jsx';
import WeatherApp from 'WeatherApp.jsx';

if (location.protocol !== "https:") location.protocol = "https:";

ReactDOM.render(
    <WeatherApp/>,
    document.getElementById('weather-app')
);
