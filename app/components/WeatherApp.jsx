import React from 'react';

export class WeatherApp extends React.Component {
    render() {
        return (
            <div className="ui one column stackable grid centered">
                <div className="nine wide computer twelve wide tablet sixteen wide mobile column">
                    <div className="ui segment">
                        <h1>Get your weather</h1>
                    </div>
                </div>
            </div>
        )
    }
}

export default WeatherApp;
