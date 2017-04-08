import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import App from './app/App';
import TooltipPage from './app/pages/TooltipPage';
import NotificationPage from './app/pages/NotificationPage';
import TrainCarPage from './app/pages/TrainCarPage';

import './index.css';

ReactDOM.render(
    (
        <Router history={ browserHistory }>
            <Route path='/' component={ App }>
                <Route path='tooltip' component={ TooltipPage } />
                <Route path='notification' component={ NotificationPage } />
                <Route path='trainCar' component={ TrainCarPage } />
            </Route>
        </Router>
    ),
    document.getElementById('root')
);
