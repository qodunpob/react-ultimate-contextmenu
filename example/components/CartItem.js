import React from 'react'
import { connect } from 'react-redux'
import styled from '@emotion/styled'
import { FaTimes } from 'react-icons/fa'

import Rating from './Rating'
import { removeFromCart } from '../actions'

const CartItemContainer = styled.li`
  padding:0 20px;
  display: flex;
  align-items: center;
  line-height: 3;
  border-bottom: 1px solid #ccc;
`
const CartItemTitle = styled.h4`
  margin: 0;
  width: 400px;
  flex-grow: 0;
  flex-shrink: 0;
  font-weight: normal;
  font-size: 14px;
  text-transform: uppercase;
`
const CartItemRating = styled.div`
  flex-grow: 1;
`
const CartItemPrice = styled.div`
  width: 100px;
  font-size: 16px;
  color: #888;
`
const Remove = styled.button`
  margin: 0;
  padding: 0;
  display: flex;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  opacity: .3;
  transition-duration: .5s;
  cursor: pointer;
  &:hover {
    opacity: .5;
  }
`

const CartItem = ({ item, removeFromCart }) => <CartItemContainer>
  <CartItemTitle>{item.title}</CartItemTitle>
  <CartItemRating><Rating rating={item.rating} /></CartItemRating>
  <CartItemPrice>${item.price.toFixed(2)}</CartItemPrice>
  <Remove title='Remove from Cart' onClick={removeFromCart}><FaTimes /></Remove>
</CartItemContainer>

const mapStateToProps = ({ shop }, { itemKey }) => ({
  shop,
  item: shop.get('list').get(itemKey)
})

const mapDispatchToProps = (dispatch, { itemKey }) => ({
  removeFromCart: () => dispatch(removeFromCart(itemKey))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartItem)
