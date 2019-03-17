import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import styled from '@emotion/styled'
import { FaTrash } from 'react-icons/fa'

import {
  MenuProvider,
  Menu,
  MenuItem,
  Submenu,
  MenuFilter
} from '~react-ultimate-contextmenu'

import CartItem from './CartItem'
import { addToCart, removeAllFromCart } from '../actions'

const CartContainer = styled.section`
  padding: 20px 40px 0;
  position: fixed;
  right: 100px;
  bottom: 0;
  left: 100px;
  height: 400px;
  box-sizing: border-box;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, .3), 0 0 0 1px #eee;
`
const CartTitle = styled.h3`
  margin: 0 0 20px;
  font-weight: normal;
  font-size: 18px;
  text-transform: uppercase;
`
const CartList = styled.ul`
  margin: 0 0 20px;
  padding: 0;
  width: 100%;
  height: 220px;
  overflow-y: scroll;
  border: 1px solid #ccc;
`
const CartEmpty = styled.div`
  display: flex;
  width: 100%;
  height: 300px;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  color: #888;
`
const BuyButton = styled.button`
  padding: 0 40px;
  float: right;
  font-weight: bold;
  font-size: 20px;
  line-height: 3;
  text-transform: uppercase;
  color: #fff;
  background: #00bfff;
  border: none;
  border-radius: 15px;
  cursor: pointer;
`

const Cart = ({ shop, addToCart, removeAllFromCart, onOpenAbout }) => {
  const availableList = new Map()
  shop.get('list').forEach((item, key) => {
    if (!shop.get('hiddenList').has(key)) {
      availableList.set(key, item)
    }
  })

  return <MenuProvider>
    <CartContainer>
      <CartTitle>Your Shopping Cart</CartTitle>
      {shop.get('cartList').size
        ? <Fragment>
          <CartList>
            {shop.get('cartList').map(key =>
              <CartItem key={key} itemKey={key} />)
            }
          </CartList>
          <BuyButton onClick={onOpenAbout}>Buy</BuyButton>
        </Fragment>
        : <CartEmpty>... is empty</CartEmpty>
      }
      <Menu>
        <Submenu label='Add to Cart...'>
          <MenuFilter available={availableList.size > 10} />
          {Array.from(availableList.entries()).map(([key, item]) =>
            <MenuItem key={key} onClick={() => { addToCart(key) }}>
              {item.title}
            </MenuItem>
          )}
        </Submenu>
        <MenuItem
          leftIcon={<FaTrash />}
          disabled={!shop.get('cartList').size}
          onClick={removeAllFromCart}
        >Remove all from Cart</MenuItem>
      </Menu>
    </CartContainer>

  </MenuProvider>
}

const mapStateToProps = ({ shop }) => ({
  shop
})

const mapDispatchToProps = dispatch => ({
  addToCart: key => dispatch(addToCart(key)),
  removeAllFromCart: () => dispatch(removeAllFromCart())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart)
