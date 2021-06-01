import { Component } from 'react';

interface RamState {
    ramData: String
};

class RAMBlob extends Component<{}, RamState> {
    constructor(props: {}) {
        super(props);

        this.state = { ramData: '' };
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
        fetch('/api/ram', requestOptions).then(res => res.json()).then(res => {
            if (res.status === 401) {
                localStorage.setItem('login_token', '');
                window.location.href = '/login';
            } else {

                var returnArr = res.data.split('\n');
                var tableDomData = '<table><tr><th></th><th>total</th><th>used</th><th>free</th><th>shared</th><th>buff/cache</th><th>available</th></tr></table>';
                for (var i = 1; i < returnArr.length - 1; i++) {
                    var dataArr = returnArr[i].split(' ');
                    var rowData = '<tr>';
                    for (var j = 0; j < dataArr.length; j++) {
                        if (dataArr[j] !== '') {
                            rowData += '<td>' + dataArr[j] + '</td>'
                        }
                    }
                    tableDomData += rowData + '</tr>';
                }
                tableDomData += '</table>';
                (document.getElementById('tableSpot') as HTMLElement).innerHTML = tableDomData;
            }
        });
    }

    render() {

        return (
            <div className="ram-blob">
                <h4>Ram Output</h4>
                <div id="tableSpot"></div>
            </div>
        );
    }
}

export default RAMBlob;