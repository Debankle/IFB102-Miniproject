import { Component } from 'react';

interface fsState {
    fsData: String
};

class FSBlob extends Component<{}, fsState> {
    constructor(props: {}) {
        super(props);

        this.state = { fsData: '' };
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
        fetch('/api/struct', requestOptions).then(res => res.json()).then(res => {
            if (res.status === 401) {
                localStorage.setItem('login_token', '');
                window.location.href = '/login';
            } else {
                this.setState({ fsData: res.data });
            }
        });
    }

    render() {

        return (
            <div className="fs-blob">
                <h4>Filestructure Output</h4>
                <p>{this.state.fsData}</p>
            </div>
        );
    }
}

export default FSBlob;