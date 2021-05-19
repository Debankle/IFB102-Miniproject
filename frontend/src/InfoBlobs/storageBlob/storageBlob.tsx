import { Component } from 'react';
import { storageBlob } from '../infoBlobs';

interface StorageState {
    storageData: String
};

class StorageBlob extends Component<{}, StorageState> {
    constructor(props: {}) {
        super(props);

        this.state = { storageData: '' };
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
        fetch('/api/storage', requestOptions).then(res => res.json()).then(res => {
            if (res.status === 401) {
                localStorage.setItem('login_token', '');
                window.location.href = '/login';
            } else {
                this.setState({ storageData: res.data });
            }
        });
    }

    render() {

        return (
            <div className="ip-blob">
                <h4>Storage Output</h4>
                <p>{this.state.storageData}</p>
            </div>
        );
    }
}

export default StorageBlob;