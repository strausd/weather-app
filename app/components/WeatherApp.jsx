import React from 'react';
import axios from 'axios';

import WeatherSearch from 'WeatherSearch.jsx';
import WeatherInfo from 'WeatherInfo.jsx';

export class WeatherApp extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            isLoading: false,
            searchText: undefined,
            lat: undefined,
            long: undefined,
            location: undefined,
            temp: undefined,
            description: undefined,
            status: 200
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getLocation = this.getLocation.bind(this);
        this.getCity = this.getCity.bind(this);
        this.handleLocationClick = this.handleLocationClick.bind(this);
    }
    getLocation (searchText) {
        this.setState({
            isLoading: true,
            searchText
        });
        var locationText = encodeURIComponent(searchText);
        var geolocationUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${locationText}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
        return axios.get(geolocationUrl);
    }
    getCity (lat, long) {
        this.setState({
            isLoading: true,
        });
        var geolocationUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
        return axios.get(geolocationUrl);
    }
    getWeather (lat, long) {
        var weatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}`;
        return axios.get(weatherUrl);

    }
    handleSubmit (searchText) {
        this.getLocation(searchText).then((locRes) => {
            var lat = locRes.data.results[0].geometry.location.lat;
            var long = locRes.data.results[0].geometry.location.lng;
            this.getWeather(lat, long).then((weatherRes) => {
                this.setState({
                    isLoading: false,
                    location: locRes.data.results[0].formatted_address,
                    temp: weatherRes.data.main.temp,
                    description: weatherRes.data.weather[0].description,
                    status: 200,
                    lat,
                    long
                });
            });
        }).catch((err) => {
            this.setState({
                isLoading: false,
                status: 404
            });
        });
    }
    handleLocationClick () {
        if('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                var lat = position.coords.latitude;
                var long = position.coords.longitude;
                this.getCity(lat, long).then((locRes) => {
                    this.getWeather(lat, long).then((weatherRes) => {
                        this.setState({
                            isLoading: false,
                            location: locRes.data.results[2].formatted_address,
                            temp: weatherRes.data.main.temp,
                            description: weatherRes.data.weather[0].description,
                            status: 200,
                            lat,
                            long
                        });
                    });
                }).catch((err) => {
                    this.setState({
                        isLoading: false,
                        status: 404
                    });
                });

            }, (err) => {
                this.setState({
                    isLoading: false,
                    status: 401
                });
            });
        } else {
            alert('location not available');
        }
    }
    render () {
        var {isLoading, location, temp, description, status} = this.state;
        return (
            <div className="ui one column stackable grid centered">
                <div className="sixteen wide mobile twelve wide tablet nine wide computer column">
                    <div className="container">
                        <h1>Get your weather</h1>
                        <WeatherSearch onSubmit={this.handleSubmit} onLocationClick={this.handleLocationClick}/>
                        <WeatherInfo isLoading={isLoading} location={location} temp={temp} description={description} status={status}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default WeatherApp;
