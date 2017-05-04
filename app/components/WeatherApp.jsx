import React from 'react';

import WeatherSearch from 'WeatherSearch.jsx';
import WeatherInfo from 'WeatherInfo.jsx';

export class WeatherApp extends React.Component {
    constructor (props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit (searchText) {
        console.log(`Getting weather for ${searchText}...`);
    }
    render () {
        return (
            <div className="ui one column stackable grid centered">
                <div className="sixteen wide mobile twelve wide tablet nine wide computer column">
                    <div className="container">
                        <h1>Get your weather</h1>
                        <WeatherSearch onSubmit={this.handleSubmit}/>
                        <WeatherInfo/>
                    </div>
                </div>
            </div>
        )
    }
}

export default WeatherApp;
