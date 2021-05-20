import React, { Component } from 'react';
import './Menubar.css';

class Menubar extends Component<{}, {}> {

    setActive(id: string) {
        document.getElementById('home')?.setAttribute('className', 'kaput');
        document.getElementById('news')?.setAttribute('className', 'kaput');
        document.getElementById('about')?.setAttribute('className', 'kaput');
        document.getElementById('contacts')?.setAttribute('className', 'kaput');

        document.getElementById(id)?.setAttribute('className', 'active');
    }

    logout() {
        localStorage.setItem('login_token', '');
    }

    render() {
        return (
            <div className="menubar">
                <ul>
                    <li><a id="home" className="active" href="/login" onClick={this.logout}>Logout</a></li>
                    <h1 className="Title">Raspberry Pi Webserver</h1>

                </ul>
            </div>
        );
    }

}

export default Menubar;