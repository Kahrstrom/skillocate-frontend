import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import {
    ConnectedRouter
} from 'react-router-redux'
import 'typeface-roboto'
import App from './components/App';
import store, { history } from './utils/store'
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
    <Provider store={store} >
        <ConnectedRouter history={history} >
            <App />
        </ConnectedRouter>
    </Provider>, document.getElementById('root'));

registerServiceWorker()
