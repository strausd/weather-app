import React from 'react';

export class WeatherInfo extends React.Component {
    constructor (props) {
        super(props);
        this.getInfo = this.getInfo.bind(this);
        this.formatDescription = this.formatDescription.bind(this);
    }
    formatDescription() {
        var {description} = this.props;
        return description.charAt(0).toUpperCase() + description.slice(1);
    }
    getInfo () {
        var {isLoading, location, temp, description, status, deg} = this.props;
        var description = description ? this.formatDescription() : undefined;
        if(isLoading && status === 200) {
            return (
                <div className="info-box">
                    <div className="loader-container">
                        <div className="loader"></div>
                    </div>
                </div>
            )
        } else if (!isLoading && location && status === 200) {
            return (
                <div className="info-box">
                    <h2>{location}</h2>
                    <p>{description} with a current temperature of {Math.round(temp)}&#176;{deg}</p>
                </div>
            )
        } else if(status === 401) {
            return (
                <div className="info-box">
                    <h2>Unable to get weather</h2>
                    <p>Location blocked</p>
                </div>
            )
        } else if(status === 402) {
            return (
                <div className="info-box">
                    <h2>Unable to get weather</h2>
                    <p>Yahoo Weather API failure</p>
                </div>
            )
        } else if(status !== 200) {
            return (
                <div className="info-box">
                    <h2>Unable to get weather for that location</h2>
                    <p>Please try again</p>
                </div>
            )
        }
    }
    render () {
        return (
            <div>
                {this.getInfo()}
            </div>
        );
    }
}

export default WeatherInfo;
