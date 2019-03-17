import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { isEqual } from 'lodash'
import styled from '@emotion/styled'
import { FaRegSquare, FaCheckSquare, FaEyeSlash, FaEye } from 'react-icons/fa'

import {
  MenuProvider,
  Menu,
  MenuItem,
  Submenu,
  MenuFilter,
  Separator
} from '~react-ultimate-contextmenu'

import {
  addToCompare,
  removeFromCompare,
  compare,
  hide,
  show
} from '../actions'
import Preview from './Preview'
import Properties from './Properties'

const ItemContainer = styled.article`
  margin: 10px;
  padding: 20px;
  width: 160px;
  height: 160px;
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, .2);
  transition-duration: .5s;
  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, .5);
  }
`
const ItemTitle = styled.h3`
  text-align: center;
  font-size: 12px;
  font-weight: normal;
  text-transform: uppercase;
`
class Item extends Component {
  shouldComponentUpdate (nextProps) {
    const {
      itemKey,
      item,
      shop
    } = this.props

    return (itemKey !== nextProps.itemKey) ||
      !isEqual(item, nextProps.item) ||
      (shop.get('cartList').has(itemKey) !== nextProps.shop.get('cartList').has(itemKey)) ||
      (shop.get('compareList').has(itemKey) !== nextProps.shop.get('compareList').has(itemKey)) ||
      !shop.get('hiddenList').equals(nextProps.shop.get('hiddenList'))
  }

  render () {
    const {
      itemKey,
      shop,
      item,
      addToCompare,
      removeFromCompare,
      compareWith,
      hide,
      show
    } = this.props

    const compareAvailableList = new Map()
    shop.get('list').forEach((item, key) => {
      if (key !== itemKey && !shop.get('hiddenList').has(key)) {
        compareAvailableList.set(key, item)
      }
    })

    return <MenuProvider>
      <ItemContainer>
        <ItemTitle>{item.title}</ItemTitle>
      </ItemContainer>
      <Menu>
        <Preview itemKey={itemKey} />
        <Properties itemKey={itemKey} />
        <Separator />
        {shop.get('hiddenList').has(itemKey)
          ? <MenuItem leftIcon={<FaEye />} onClick={show}>Show</MenuItem>
          : <Fragment>
            {shop.get('compareList').has(itemKey)
              ? <MenuItem rightIcon={<FaCheckSquare />} onClick={removeFromCompare}>Compare</MenuItem>
              : <MenuItem rightIcon={<FaRegSquare />} onClick={addToCompare}>Compare</MenuItem>
            }
            <Submenu label='Compare with...'>
              <MenuFilter available={compareAvailableList.size > 10} />
              {Array.from(compareAvailableList.entries()).map(([key, item]) =>
                <MenuItem key={key} onClick={() => { compareWith(key) }}>
                  {item.title}
                </MenuItem>
              )}
            </Submenu>
            <Separator />
            <MenuItem leftIcon={<FaEyeSlash />} onClick={hide}>Hide</MenuItem>
          </Fragment>
        }

      </Menu>
    </MenuProvider>
  }
}

const mapStateToProps = ({ shop }, { itemKey }) => ({
  shop,
  item: shop.get('list').get(itemKey)
})

const mapDispatchToProps = (dispatch, { itemKey }) => ({
  addToCompare: e => {
    e.stopPropagation()
    dispatch(addToCompare(itemKey))
  },
  removeFromCompare: e => {
    e.stopPropagation()
    dispatch(removeFromCompare(itemKey))
  },
  compareWith: key => dispatch(compare([itemKey, key])),
  hide: () => dispatch(hide(itemKey)),
  show: () => dispatch(show(itemKey))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Item)
