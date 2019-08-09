import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './components/Login'
import Place from './components/Place'
import Profile from './components/Profile'
import Register from './components/Register'

const Root = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={App}></Route>
            <Route exact path='/login' component={Login}></Route>
            <Route exact path='/register' component={Register}></Route>
            <Route exact path='/profile/:id' component={Profile}></Route>
            <Route exact path='/place/:id' component={Place}></Route>
            <Route component='notFound'></Route>
        </Switch>
    </BrowserRouter>
)

ReactDOM.render(<Root />, document.getElementById('root'));

serviceWorker.unregister();
