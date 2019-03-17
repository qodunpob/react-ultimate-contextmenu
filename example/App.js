import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { hot } from 'react-hot-loader/root'

import Shop from './components/Shop'
import app from './reducers'

const store = createStore(app)

const App = () => <React.StrictMode>
  <Provider store={store}>
    <Shop />
  </Provider>
</React.StrictMode>

export default hot(App)
