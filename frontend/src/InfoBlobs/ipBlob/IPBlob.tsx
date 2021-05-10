import React, { Component } from 'react';
import { Redirect } from 'react-router';

interface IState {
    ipData: string;
    authFail: boolean;
}

class IPBlob extends Component<{}, IState> {

    constructor(props: {}) {
        super(props);

        this.state = { ipData: '', authFail: false };
    }

    componentDidMount() {
        fetch('/api/ip').then(res => res.json()).then(res => {
            console.log(res);
            if (res.response === 403) {
                this.setState({ authFail: true });
            } else {
                this.setState({ ipData: res.message });
            }
        });
    }

    render() {
        if (this.state.authFail) {
            return <Redirect to="/login" />
        } else {
            return (
                <div className="ip-blob">
                    <h4>IP Config Output</h4>
                    <p>{this.state.ipData}</p>
                </div>
            );
        }
    }
}

export default IPBlob;