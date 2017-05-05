import React from 'react';
import axios from 'axios';

import WeatherSearch from 'WeatherSearch.jsx';
import WeatherInfo from 'WeatherInfo.jsx';

export class WeatherApp extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            isLoading: false,
            location: undefined,
            temp: undefined,
            deg: undefined,
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
        });
        var locationText = encodeURIComponent(searchText);
        var geolocationUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${locationText}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
        console.log(geolocationUrl);
        return axios.get(geolocationUrl);
    }
    getCity (lat, long) {
        this.setState({
            isLoading: true,
        });
        var geolocationUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
        return axios.get(geolocationUrl);
    }
    getWeather (location) {
        // var weatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}`;
        var weatherUrl = `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${location}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`
        console.log(weatherUrl);
        return axios.get(weatherUrl);
    }
    handleSubmit (searchText) {
        this.getLocation(searchText).then((res) => {
            var location = res.data.results[0].formatted_address;
            var properLocation = encodeURIComponent(location);

            if(properLocation) {
                this.getWeather(properLocation).then((weatherRes) => {
                    console.log(weatherRes);
                    if(weatherRes.data.query.results) {
                        this.setState({
                            isLoading: false,
                            location: location,
                            temp: weatherRes.data.query.results.channel.item.condition.temp,
                            deg: weatherRes.data.query.results.channel.units.temperature,
                            description: weatherRes.data.query.results.channel.item.condition.text,
                            status: 200
                        });
                    } else {
                        this.setState({
                            isLoading: false,
                            status: 402
                        });
                    }
                });
            } else {
                console.log('no properLocation came back');
            }
        }).catch((err) => {
            console.log(err);
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
                this.getCity(lat, long).then((res) => {
                    var location = res.data.results[1].formatted_address;
                    var properLocation = encodeURIComponent(location);

                    if(properLocation) {
                        this.getWeather(properLocation).then((weatherRes) => {
                            console.log(weatherRes);
                            if(weatherRes.data.query.results) {
                                this.setState({
                                    isLoading: false,
                                    location: location,
                                    temp: weatherRes.data.query.results.channel.item.condition.temp,
                                    deg: weatherRes.data.query.results.channel.units.temperature,
                                    description: weatherRes.data.query.results.channel.item.condition.text,
                                    status: 200
                                });
                            } else {
                                this.setState({
                                    isLoading: false,
                                    status: 402
                                });
                            }
                        });
                    } else {
                        console.log('no properLocation came back');
                    }
                }).catch((err) => {
                    console.log(err);
                    this.setState({
                        isLoading: false,
                        status: 404
                    });
                });

            }, (err) => {
                console.log(err);
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
        var {isLoading, location, temp, description, status, deg} = this.state;
        return (
            <div className="ui one column stackable grid centered">
                <div className="sixteen wide mobile twelve wide tablet nine wide computer column">
                    <div className="container">
                        <h1>Get your weather</h1>
                        <WeatherSearch onSubmit={this.handleSubmit} onLocationClick={this.handleLocationClick}/>
                        <WeatherInfo isLoading={isLoading} location={location} temp={temp} description={description} status={status} deg={deg}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default WeatherApp;
