import React, { Component } from 'react';

interface IState {
    password: string;
}

class Login extends Component<{}, IState> {

    constructor(props: any) {
        super(props);
        this.state = { password: '' }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: React.FormEvent<HTMLInputElement>) {
        this.setState({
            'password': (event.target as HTMLInputElement).value
        });
    }

    _setErrMessage(err: any) {
        let errorTextP = document.getElementById('errorText') as HTMLElement;
        errorTextP.innerHTML = err;
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: this.state.password
            })
        }
        fetch('/api/login', requestOptions).then(res => res.json()).then(res => {
            if (res.status === 200) {
                localStorage.setItem('login_token', res.token);
                window.location.href = '/';
            } else {
                this._setErrMessage(res.message);
            }
        });

        this.setState({
            password: ''
        });
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
        fetch('/api/verifyToken', requestOptions).then(res => res.json()).then(res => {
            if (res.status === 200) {
                window.location.href = '/';
            } else {
                localStorage.setItem('login_token', '');
            }
        });
    }

    render() {
        return (
            <div className="Login">
                <h1>Please login to access the Raspberry Pi</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>Enter Admin Password</label>
                    <input type="password" name="password" onChange={this.handleChange} value={this.state.password} />
                    <input type="submit" value="submit" />
                </form>
                <div className="errorBox" id="errorBox"><p id="errorText"></p></div>
            </div>
        );
    }
}

export default Login;