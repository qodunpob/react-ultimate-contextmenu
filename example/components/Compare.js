import React from 'react'
import { connect } from 'react-redux'
import styled from '@emotion/styled'
import { FaTimes } from 'react-icons/fa'

import Preview from './Preview'
import Properties from './Properties'
import { closeCompare } from '../actions'

const CompareContainer = styled.div`
  padding: 5px;
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  background: #f1f1f1;
  box-shadow: 0 0 10px rgba(0, 0, 0, .3), 0 0 0 1px #eee;
`
const CompareItem = styled.div`
  margin: 5px;
  width: 220px;
  background: #fff;
  border: 1px solid #eee;
`
const CloseButton = styled.button`
  position: absolute;
  top: 0px;
  left: -29px;
  display: flex;
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  background: inherit;
  border: 1px solid #eee;
  border-right: none;
  cursor: pointer;
`

const Compare = ({ shop, closeCompare }) => <CompareContainer>
  {shop.get('compareList').map(key => <CompareItem key={key}>
    <Preview itemKey={key} />
    <Properties itemKey={key} />
  </CompareItem>)}
  <CloseButton title='Close' onClick={closeCompare}><FaTimes /></CloseButton>
</CompareContainer>

const mapStateToProps = ({ shop }) => ({
  shop
})

const mapDispatchToProps = dispatch => ({
  closeCompare: () => dispatch(closeCompare())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Compare)
