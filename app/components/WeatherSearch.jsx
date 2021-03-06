import React from 'react';

export class WeatherSearch extends React.Component {
    constructor (props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onLocationClick = this.onLocationClick.bind(this);
    }
    onSubmit (e) {
        e.preventDefault();
        var searchText = this.searchText.value;
        if(searchText && searchText.length > 0) {
            this.searchText.value = '';
            this.props.onSubmit(searchText);
        }
    }
    onLocationClick () {
        this.props.onLocationClick();
    }
    render () {
        return (
            <div className="weather-search">
                <form onSubmit={this.onSubmit}>
                    <div className="search-input">
                        <input className="text-input" type="text" ref={searchText => this.searchText = searchText} placeholder="Enter City" autoFocus/>
                    </div>
                    <div className="search-button-container">
                        <button className="search-button">Search</button>
                    </div>
                </form>
                <div className="location-button-container">
                    <button className="location-button" onClick={this.onLocationClick}>Use my location</button>
                </div>
            </div>
        );
    }
}

export default WeatherSearch;
