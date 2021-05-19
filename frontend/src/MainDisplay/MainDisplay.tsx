import React, { Component } from 'react';
import './MainDisplay.css';
import Menubar from '../Menubar/Menubar';
import * as Blob from '../InfoBlobs/infoBlobs';

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
                <Blob.IPBlob />
                <Blob.RAMBlob />
                <Blob.StorageBlob />
                <Blob.fsBlob />
            </div>
        );
    }
}

export default MainDisplay;