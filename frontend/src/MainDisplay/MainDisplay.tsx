import React, { Component } from 'react';
import './MainDisplay.css';
import Menubar from '../Menubar/Menubar';
import IPBlob from '../InfoBlobs/ipBlob/IPBlob';

interface IProps {
}

interface IState {
    ipInfo: string
}

class MainDisplay extends Component<IProps, IState> {

    render() {
        return(
            <div className="App">
                <Menubar />
                <h1>Raspberry Pi Webserver</h1>
                <IPBlob />
            </div>
        );
    }
}

export default MainDisplay;