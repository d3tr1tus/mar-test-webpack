import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Switch, BrowserHistory } from 'react-router-dom';
import { Provider } from 'react-redux';
import createHistory from "history/createBrowserHistory";

import App from './js/pages/App/App';

const app = document.getElementById('app');

const history = createHistory();

ReactDOM.render(
    <Router history={history}>
        <div>
            <Route path="/" component={App}/>
        </div>
    </Router>
    , app
);

module.hot.accept();