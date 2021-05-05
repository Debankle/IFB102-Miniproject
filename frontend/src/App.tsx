import React, { Component } from 'react';
import './App.css';


interface User {
    [key: string]: string;
}

class App extends Component {
    state = {users: [] as User[]}

    componentDidMount() {
        fetch('/api/users').then(res => res.json()).then(users => this.setState({ users }))
    }

    render() {
        return(
            <div className="App">
                <h1>Data</h1>
                {this.state.users.map(user =>
                    <div key={user.id}>{user.username}</div>
                )}
            </div>
        );
    }
}

export default App;