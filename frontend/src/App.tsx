import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainDisplay from './MainDisplay/MainDisplay';
import Login from './Login/Login';


class App extends Component<{}, {}> {

    render() {
        return (
            <BrowserRouter>
                <div className="app">
                    <Switch>
                        <Route path="/" exact component={MainDisplay}></Route>
                        <Route path="/login" component={Login}></Route>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;