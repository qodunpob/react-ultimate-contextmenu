import React from 'react'
import { connect } from 'react-redux'
import styled from '@emotion/styled'
import { FaShoppingCart } from 'react-icons/fa'

import { addToCart } from '../actions'

const PreviewContainer = styled.article`
  position: relative;
  min-width: 200px;
  height: 120px;
  overflow: hidden;
  &::before {
    content: ' ';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: ${({ color }) => color};
    opacity: 0.5;
    box-shadow: inset 0 -10px 10px -10px rgba(0, 0, 0, .25);
  }
`
const PreviewTitle = styled.h3`
  margin: 0;
  padding: 10px;
  position: absolute;
  right: 20px;
  bottom: 0;
  left: 10px;
  overflow: hidden;
  font-weight: bold;
  font-size: 12px;
  white-space: nowrap;
  text-transform: uppercase;
  text-overflow: ellipsis;
  background: #fff;
  border-radius: 5px 5px 0 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, .25);
`
const AddToCart = styled.button`
  margin: 0;
  padding: 5px 8px;
  position: absolute;
  top: 10px;
  right: 10px;
  box-sizing: content-box;
  font-size: 10px;
  color: #fff;
  background: #ff4136;
  border: 2px solid #fff;
  border-radius: 5px;
  cursor: pointer;
`
const AddedToCart = styled(AddToCart.withComponent('div'))`
  background: #3cb371;
`

const Preview = ({ shop, itemKey, item, addToCart }) =>
  <PreviewContainer color={item.color}>
    {shop.get('cartList').has(itemKey)
      ? <AddedToCart><FaShoppingCart /> Added to Cart</AddedToCart>
      : <AddToCart onClick={addToCart}><FaShoppingCart /> Add to Cart</AddToCart>
    }
    <PreviewTitle>{item.title}</PreviewTitle>
  </PreviewContainer>

const mapStateToProps = ({ shop }, { itemKey }) => ({
  shop,
  item: shop.get('list').get(itemKey)
})

const mapDispatchToProps = (dispatch, { itemKey }) => ({
  addToCart: () => dispatch(addToCart(itemKey))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Preview)
