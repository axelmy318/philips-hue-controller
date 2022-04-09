import React from 'react';
import { render } from 'react-dom';
import App from './containers/App';
import { Provider } from 'react-redux'
import { applyMiddleware, createStore, compose } from 'redux'
import { createPromise } from './redux/middleware'
import reducers from './redux/reducer'
import { BrowserRouter as Router } from 'react-router-dom'
import UpdateChecker from './components/UpdateChecker';

let useReduxDevTools = false
let composer

if(window.__REDUX_DEVTOOLS_EXTENSION__ !== undefined)
  useReduxDevTools = true

if(useReduxDevTools)
  composer = compose(window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(/*createLogger(),*/ createPromise()))
else
  composer = compose(applyMiddleware(createPromise()))

const store = createStore(reducers, composer)

// Now we can render our application into it
render( 
    
    <React.StrictMode>
        <Router>
            <Provider store={store} >
                <App />
                <UpdateChecker />
            </Provider>
        </Router>
    </React.StrictMode>
    , document.getElementById('app') 
);
