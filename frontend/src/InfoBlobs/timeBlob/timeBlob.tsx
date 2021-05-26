import React, { Component } from 'react';
import './timeBlob.css';

interface ITimeState {
    dateData: {
        date: string;
        time: string;
    }
}


class TimeBlob extends Component<{}, ITimeState> {

    constructor(props: {}) {
        super(props);

        this.state = {
            dateData: {
                date: '',
                time: ''
            }
        };
    }

    updateDate() {
        const today = new Date();
        const day = today.toLocaleDateString('en', { weekday: 'long' });
        const date = `${day}, ${today.getDate()} ${today.toLocaleDateString('en', { month: 'long' })}\n\n`;
        const time = today.toLocaleTimeString('en', { hour: 'numeric', hour12: true, minute: 'numeric' });
        this.setState({
            dateData: {
                date: date,
                time: time
            }
        });
    }

    componentDidMount() {
        this.updateDate();
        setInterval(() => {
            this.updateDate();
        }, 30 * 1000);
    }

    render() {
        return (
            <div className="timeblob">
                <h3 className="timeInfoBox">{this.state.dateData.date} {this.state.dateData.time}</h3>
                <br />
            </div>
        )
    }
}

export default TimeBlob;