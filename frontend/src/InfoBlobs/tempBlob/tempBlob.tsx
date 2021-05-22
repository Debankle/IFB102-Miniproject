import { Component } from 'react';

interface TempState {
    temp: string
};

class TempBlob extends Component<{}, TempState> {

    constructor(props: {}) {
        super(props);

        this.state = { temp: '' };
    }

    componentDidMount() {
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
                this.setState({ temp: res.data });
            }
        });
    }

    render() {

        return (
            <div className="temp-blob">
                <h4>Temperature Output</h4>
                <p>{this.state.temp}</p>
            </div>
        );
    }

};

export default TempBlob;