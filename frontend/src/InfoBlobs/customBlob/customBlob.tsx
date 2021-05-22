import React, { Component } from 'react';
import './customBlob.css';

interface CustomState {
    command: string;
    commandResponse: string;
}

class CustomBlob extends Component<{}, CustomState> {

    constructor(props: {}) {
        super(props);

        this.state = {
            command: '',
            commandResponse: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.commandSend = this.commandSend.bind(this);
    }

    handleChange(event: React.FormEvent<HTMLInputElement>) {
        this.setState({
            'command': (event.target as HTMLInputElement).value
        });
    }

    commandSend(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: {
                authorization: localStorage.getItem('login_token') || '',
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                command: this.state.command
            })
        }
        fetch('/api/custom', requestOptions).then(res => res.json()).then(res => {
            this.setState({ commandResponse: res.data });
        });
    }


    render() {
        return (
            <div className="custom-blob">
                <h4>Custom Command</h4>

                <form onSubmit={this.commandSend}>
                    <input className="cmdInput" type="input" name="command" onChange={this.handleChange} value={this.state.command} />
                    <input type="submit" value="submit" />
                </form>
                <p className="responseInfo" id="responseInfo">{this.state.commandResponse}</p>
            </div>
        );
    }
}

export default CustomBlob;