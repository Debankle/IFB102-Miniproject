import React, { Component } from 'react';
import './IPBlob.css';

interface IState {
    inet: string;
    inet6: string;
    netmask: string;
    broadcast: string;
}

class IPBlob extends Component<{}, IState> {

    constructor(props: {}) {
        super(props);

        this.state = {
            inet: '',
            inet6: '',
            netmask: '',
            broadcast: ''
        }
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
                var ipGot = false;
                var count = 1;
                var index = 1;
                while (!ipGot) {
                    index = res.data.indexOf('inet ', index + 1);
                    if (res.data.slice(index + 5, index + 14) !== '127.0.0.1') {
                        var indexNextSpace = res.data.indexOf(' ', index + 5);
                        var ip = res.data.slice(index + 5, indexNextSpace);
                        this.setState({ inet: ip });

                        var inet6Index = res.data.indexOf('inet6', indexNextSpace - 100);
                        var perIndex = res.data.indexOf('%', inet6Index);
                        var ip6 = res.data.slice(inet6Index + 6, perIndex);
                        this.setState({ inet6: ip6 });

                        var netmask = res.data.slice(indexNextSpace + 8, indexNextSpace + 19);
                        this.setState({ netmask: netmask });

                        var broadcastEnd = res.data.indexOf('255', indexNextSpace + 31) + 3;
                        var broadcast = res.data.slice(indexNextSpace + 30, broadcastEnd);
                        this.setState({ broadcast: broadcast });

                        ipGot = true;
                    }
                    if (count >= 10) {
                        this.setState({
                            inet: 'Could not find IPv4',
                            inet6: 'Could not find IPv6',
                            netmask: 'Could not find netmask',
                            broadcast: 'Could not find broadcast'
                        });
                        ipGot = true;
                    }
                    count++;
                }

            }
        });
    }

    render() {

        return (
            <div className="ip-blob">
                <h4>IP Info</h4>
                <p className="ipInfo">IPv4 inet: {this.state.inet}</p>
                <p className="ipInfo">IPv6 inet6: {this.state.inet6}</p>
                <p className="ipInfo">Netmask: {this.state.netmask}</p>
                <p className="ipInfo">Broadcast: {this.state.broadcast}</p>
            </div>
        );
    }
}

export default IPBlob;