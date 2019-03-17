/*
 * action types
 */
export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const REMOVE_ALL_FROM_CART = 'REMOVE_ALL_FROM_CART'
export const ADD_TO_COMPARE = 'ADD_TO_COMPARE'
export const COMPARE = 'COMPARE'
export const REMOVE_FROM_COMPARE = 'REMOVE_FROM_COMPARE'
export const CLOSE_COMPARE = 'CLOSE_COMPARE'
export const HIDE = 'HIDE'
export const SHOW = 'SHOW'

/*
 * action creators
 */
export const addToCart = key => ({
  type: ADD_TO_CART,
  key
})

export const removeFromCart = key => ({
  type: REMOVE_FROM_CART,
  key
})

export const removeAllFromCart = () => ({
  type: REMOVE_ALL_FROM_CART
})

export const addToCompare = key => ({
  type: ADD_TO_COMPARE,
  key
})

export const compare = keys => ({
  type: COMPARE,
  keys
})

export const removeFromCompare = key => ({
  type: REMOVE_FROM_COMPARE,
  key
})

export const closeCompare = () => ({
  type: CLOSE_COMPARE
})

export const hide = key => ({
  type: HIDE,
  key
})

export const show = key => ({
  type: SHOW,
  key
})
