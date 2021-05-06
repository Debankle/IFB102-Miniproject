import React, { Component } from 'react';
import './MainDisplay.css';
import Menubar from '../Menubar/Menubar';


interface IProps {
}

interface IState {
    ipInfo: string
}

class MainDisplay extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = { ipInfo: '' };
    }

    componentDidMount() {
        fetch('/api/ip').then(res => res.text()).then(ipData => this.setState({ ipInfo: ipData }));
    }

    render() {
        return(
            <div className="App">
                <Menubar />
                <h1>Raspberry Pi Webserver</h1>
                <div className="currentIP">
                    <h3>ifconfig -a</h3>
                    <p className="ipInfo">{this.state.ipInfo}</p>
                </div>
            </div>
        );
    }
}

export default MainDisplay;