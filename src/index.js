import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './components/Login'
import Place from './components/Place'
import Profile from './components/Profile'
import Register from './components/Register'
import HomePage from './components/HomePage'
import NotFound from './components/NotFound'

const Root = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={HomePage}></Route>
            <Route exact path='/login' component={Login}></Route>
            <Route exact path='/register' component={Register}></Route>
            <Route exact path='/profile/:id' component={Profile}></Route>
            <Route exact path='/place/:id' component={Place}></Route>
            <Route component={NotFound}></Route>
        </Switch>
    </BrowserRouter>
)

ReactDOM.render(<Root />, document.getElementById('root'));

serviceWorker.unregister();
