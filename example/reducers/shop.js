import { Map, List, Set } from 'immutable'
import { sample, random } from 'lodash'

import { listSize, producers, colors, products } from '../constants'
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  REMOVE_ALL_FROM_CART,
  ADD_TO_COMPARE,
  COMPARE,
  REMOVE_FROM_COMPARE,
  CLOSE_COMPARE,
  HIDE,
  SHOW
} from '../actions'

const initialState = Map({
  list: List(Array(listSize).fill(null).map(() => {
    const color = sample(colors)
    return {
      title: `${sample(producers)} ${color} ${sample(products)}`,
      color,
      rating: random(5),
      purchases: random(1000),
      delivering: random(18),
      price: random(0.99, 100),
      visible: true
    }
  })),
  compareList: Set(),
  cartList: Set(),
  hiddenList: Set()
})

const shop = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return state.set('cartList', state.get('cartList').add(action.key))

    case REMOVE_FROM_CART:
      return state.set('cartList', state.get('cartList').delete(action.key))

    case REMOVE_ALL_FROM_CART:
      return state.set('cartList', state.get('cartList').clear())

    case ADD_TO_COMPARE:
      return state.set('compareList', state.get('compareList').add(action.key))

    case COMPARE:
      return state.set('compareList', action.keys.reduce(
        (accumulate, value) => accumulate.add(value),
        state.get('compareList')
      ))

    case REMOVE_FROM_COMPARE:
      return state.set('compareList', state.get('compareList').delete(action.key))

    case CLOSE_COMPARE:
      return state.set('compareList', state.get('compareList').clear())

    case HIDE:
      return state
        .set('hiddenList', state.get('hiddenList').add(action.key))
        .set('compareList', state.get('compareList').delete(action.key))
        .set('cartList', state.get('cartList').delete(action.key))

    case SHOW:
      return state.set('hiddenList', state.get('hiddenList').delete(action.key))

    default:
      return state
  }
}

export default shop
