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
        return (
            <div className="App">
                <Menubar />
                <div className="row1">
                    <Blob.IPBlob />
                    <div className="col1">
                        <Blob.RAMBlob />
                        <Blob.TempBlob />
                    </div>
                    <Blob.CustomBlob />
                </div >

                <br></br>

                <Blob.StorageBlob />


                <Blob.FSBlob />
            </div>
        );
    }
}

export default MainDisplay;