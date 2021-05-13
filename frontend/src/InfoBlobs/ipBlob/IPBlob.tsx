import React, { Component } from 'react';


interface IState {
    ipData: string;
}

class IPBlob extends Component<{}, IState> {

    constructor(props: {}) {
        super(props);

        this.state = { ipData: '' };
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
        fetch('/api/ip', requestOptions).then(res => res.json()).then(res => {
            if (res.status === 401) {
                localStorage.setItem('login_token', '');
                window.location.href = '/login';
            } else {
                this.setState({ ipData: res.data });
            }
        });
    }

    render() {

        return (
            <div className="ip-blob">
                <h4>IP Config Output</h4>
                <p>{this.state.ipData}</p>
            </div>
        );
    }
}

export default IPBlob;