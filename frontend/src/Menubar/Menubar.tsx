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
                    <li><a id="home" className="active" href="#home">Home</a></li>
                    <li><a id="news" className="kaput" href="#news">News</a></li>
                    <li><a id="contacts" className="kaput" href="#contact">Contact</a></li>
                    <li><a id="about" className="kaput" href="#about">About</a></li>
                    <li><a id="home" className="kaput" href="/login" onClick={this.logout}>Logout</a></li>
                </ul>
            </div>
        );
    }

}

export default Menubar;