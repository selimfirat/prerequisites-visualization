import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import './index.css'
import { createLogger } from 'redux-logger'
import reducer from './reducers'
import thunk from 'redux-thunk'
import App from './containers/App'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import 'airbnb-js-shims';
import registerServiceWorker from './registerServiceWorker'

const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger())
}

const store = createStore(
    reducer,
    applyMiddleware(...middleware)
)

render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path='/' component={App}/>
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)

registerServiceWorker();
