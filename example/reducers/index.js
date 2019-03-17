import { combineReducers } from 'redux'

import shop from './shop'

const app = (state = {}, action) => state

export default combineReducers({
  app,
  shop
})
