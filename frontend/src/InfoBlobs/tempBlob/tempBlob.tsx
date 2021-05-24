import { Component } from 'react';
import './tempBlob.css';

interface TempState {
    celcius: string;
    farenheit: string;
    kelvin: string;
    rankine: string;
};

class TempBlob extends Component<{}, TempState> {

    constructor(props: {}) {
        super(props);

        this.state = {
            celcius: '',
            farenheit: '',
            kelvin: '',
            rankine: ''
        };
    }

    getTemp() {
        const requestOptions = {
            method: 'GET',
            Accept: 'application/json',
            'Content-Type': 'application/json',
            headers: {
                authorization: localStorage.getItem('login_token') || ''
            }
        }
        fetch('/api/temp', requestOptions).then(res => res.json()).then(res => {
            if (res.status === 401) {
                localStorage.setItem('login_token', '');
                window.location.href = '/login';
            } else {
                var tempIndex = res.data.indexOf('=');
                var endIndex = res.data.indexOf('\'');
                var celciusTemp = parseInt(res.data.slice(tempIndex + 1, endIndex));
                this.setState({ celcius: `${Math.round(celciusTemp)}\u00B0C` });
                this.setState({ farenheit: `${Math.round(celciusTemp * 1.8 + 32)}\u00B0F` });
                this.setState({ kelvin: `${Math.round(celciusTemp + 273.15)}\u00B0K` });
                this.setState({ rankine: `${Math.round((celciusTemp + 273.15) * 9 / 5)}\u00B0R` });
            }
        });
    }

    componentDidMount() {
        this.getTemp();
        setInterval(() => {
            this.getTemp();
        }, 1000);
    }

    render() {

        return (
            <div className="temp-blob">
                <h4>Temperature Output</h4>
                <div className="tempRow">
                    <p className="tempP">Celcius: {this.state.celcius}</p>
                    <p className="tempP">Farenheit: {this.state.farenheit}</p>
                </div>
                <div className="tempRow">
                    <p className="tempP">Kelvin: {this.state.kelvin}</p>
                    <p className="tempP">Rankine: {this.state.rankine}</p>
                </div>
            </div>
        );
    }

};

export default TempBlob;
