import React from 'react'
import { connect } from 'react-redux'
import styled from '@emotion/styled'

import Rating from './Rating'

const PropertiesList = styled.dl`
  margin: 10px 12px;
  padding: 0;
  font-size: 12px;
  color: #666;
  overflow: hidden;
`
const PropertyName = styled.dt`
  margin: 5px 0;
  padding: 0;
  position: relative;
  float: left;
  clear: both;
  ${({ price }) => price ? `
    line-height: 18px;
  ` : ''}
  background: #fff;
  &::before {
    content: ' ';
    position: absolute;
    top: 50%;
    left: calc(100% + 10px);
    display: block;
    width: 200px;
    border-bottom: 1px dotted rgba(0, 0, 0, .15);
  }
`
const PropertyValue = styled.dd`
  margin: 5px 0;
  padding: 0 0 0 10px;
  position: relative;
  float: right;
  ${({ price }) => price ? `
    font-size: 16px;
    line-height: 18px;
  ` : ''}
  background: #fff;
`

const Properties = ({ item }) => <PropertiesList>
  <PropertyName>Rating</PropertyName>{' '}
  <PropertyValue><Rating rating={item.rating} /></PropertyValue>
  <PropertyName>Count of purchases</PropertyName>{' '}
  <PropertyValue>{item.purchases}</PropertyValue>
  <PropertyName price>Price</PropertyName>{' '}
  <PropertyValue price>${item.price.toFixed(2)}</PropertyValue>
</PropertiesList>

const mapStateToProps = ({ shop }, { itemKey }) => ({
  item: shop.get('list').get(itemKey)
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Properties)
