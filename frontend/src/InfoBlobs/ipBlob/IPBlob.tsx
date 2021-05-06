import React, { Component } from 'react';

interface IState {
    ipData: string
}

class IPBlob extends Component<{}, IState> {

    constructor(props: {}) {
        super(props);

        this.state = { ipData: '' };
    }

    componentDidMount() {
        fetch('/api/ip').then(res => res.text()).then(res => this.setState({ ipData: res }));
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