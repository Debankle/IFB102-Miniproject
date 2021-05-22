import { Component } from 'react';

interface RamState {
    ramData: String
};

class RAMBlob extends Component<{}, RamState> {
    constructor(props: {}) {
        super(props);

        this.state = { ramData: '' };
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
        fetch('/api/ram', requestOptions).then(res => res.json()).then(res => {
            if (res.status === 401) {
                localStorage.setItem('login_token', '');
                window.location.href = '/login';
            } else {
                this.setState({ ramData: res.data });
            }
        });
    }

    render() {

        return (
            <div className="ram-blob">
                <h4>Ram Output</h4>
                <p>{this.state.ramData}</p>
            </div>
        );
    }
}

export default RAMBlob;