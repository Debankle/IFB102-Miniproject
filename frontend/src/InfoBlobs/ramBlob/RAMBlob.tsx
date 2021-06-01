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
                var returnArrRam = res.data.split('\n');
                console.log(returnArrRam);
                var tableDomDataRam = '<table><tr><th></th><th>total</th><th>used</th><th>free</th><th>shared</th><th>buff/cache</th><th>available</th></tr></table>';
                for (var i = 1; i < returnArrRam.length - 1; i++) {
                    var dataArrRam = returnArrRam[i].split(' ');
                    var rowDataRam = '<tr>';
                    for (var j = 0; j < dataArrRam.length; j++) {
                        if (dataArrRam[j] !== '') {
                            rowDataRam += '<td>' + dataArrRam[j] + '</td>'
                        }
                    }
                    tableDomDataRam += rowDataRam + '</tr>';
                }
                tableDomDataRam += '</table>';
                (document.getElementById('tableSpotRam') as HTMLElement).innerHTML = tableDomDataRam;
            }
        });
    }

    render() {

        return (
            <div className="ram-blob">
                <h4>Ram Output</h4>
                <div id="tableSpotRam"></div>
            </div>
        );
    }
}

export default RAMBlob;