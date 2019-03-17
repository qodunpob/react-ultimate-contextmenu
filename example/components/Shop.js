import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Global, css } from '@emotion/core'
import styled from '@emotion/styled'
import { FaToggleOff, FaToggleOn, FaQuestionCircle, FaTwitter, FaGithub } from 'react-icons/fa'

import {
  MenuProvider,
  Menu,
  MenuItem,
  Separator,
  Submenu
} from '~react-ultimate-contextmenu'

import Item from './Item'
import Footer from './Footer'
import About from './About'
import Filter from './Filter'
import Compare from './Compare'
import Cart from './Cart'
import { producers, colors, products } from '../constants'

const ShopContainer = styled.section`
  padding: 10px 20px;
`
const Header = styled.header`
  margin: 20px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 3px;
  border-bottom-style: solid;
`
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`
const Title = styled.h1`
  margin: 0 30px 0 0;
  font-size: 36px;
  line-height: 2;
  text-transform: uppercase;
`
const VisibilityToggle = styled.button`
  margin-right: 20px;
  padding: 0;
  display: flex;
  align-items: center;
  font-family: inherit;
  font-size: 18px;
  color: #ccc;
  background: none;
  border: none;
  transition-duration: .5s;
  cursor: pointer;
  &:hover {
    color: #888;
  }
`
const ToggleIcon = styled.i`
  margin-right: 5px;
  display: flex;
  align-items: center;
  font-size: 26px;
  color: #888;
`
const Help = styled.button`
  padding: 0;
  font-size: 26px;
  color: #333;
  background: none;
  border: none;
  cursor: pointer;
`
const ItemList = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  list-style: none;
`

class Shop extends PureComponent {
  state = {
    showHidden: false,
    showAbout: false,
    filter: ''
  }

  isValid = key => {
    const { shop } = this.props
    const { title } = shop.get('list').get(key)
    const { showHidden, filter } = this.state
    return title.indexOf(filter) > -1 &&
      (showHidden ? shop.get('hiddenList').has(key) : !shop.get('hiddenList').has(key))
  }

  setFilter (filter) {
    this.setState({ filter })
  }

  handleToggle = () => {
    this.setState(({ showHidden }) => ({
      showHidden: !showHidden
    }))
  }

  handleOpenAbout = () => {
    this.setState({ showAbout: true })
  }

  handleCloseAbout = () => {
    this.setState({ showAbout: false })
  }

  render () {
    const { shop } = this.props
    const { showHidden, showAbout, filter } = this.state
    return <MenuProvider>
      <Global
        styles={css`
          html,
          body {
            margin: 0;
            padding: 0;
            font-family: 'Open Sans', sans-serif;
          }
        `}
      />
      <ShopContainer>
        <Header>
          <HeaderLeft>
            <Title>The ever best shop of good things</Title>
            <VisibilityToggle onClick={this.handleToggle}>
              <ToggleIcon>{showHidden ? <FaToggleOn /> : <FaToggleOff />}</ToggleIcon>
              Toggle hidden
            </VisibilityToggle>
            {filter && <Filter onFilterClear={() => { this.setFilter('') }}>{filter}</Filter>}
          </HeaderLeft>
          <Help title='About' onClick={this.handleOpenAbout}><FaQuestionCircle /></Help>
        </Header>
        <ItemList>
          {shop.get('list').map((item, key) => this.isValid(key) &&
            <li key={key}>
              <Item itemKey={key} />
            </li>)}
        </ItemList>
      </ShopContainer>
      <Footer />
      <Cart onOpenAbout={this.handleOpenAbout} />
      {showAbout && <About handleCloseAbout={this.handleCloseAbout} />}
      {shop.get('compareList').size > 1 && <Compare />}
      <Menu>
        <Submenu label='Show only...'>
          <Submenu label='Producer...'>
            {producers.map(producer =>
              <MenuItem key={producer} onClick={() => { this.setFilter(producer) }}>{producer}</MenuItem>
            )}
          </Submenu>
          <Submenu label='Color...'>
            {colors.map(color =>
              <MenuItem key={color} onClick={() => { this.setFilter(color) }}>{color}</MenuItem>
            )}
          </Submenu>
          <Submenu label='Product...'>
            {products.map(product =>
              <MenuItem key={product} onClick={() => { this.setFilter(product) }}>{product}</MenuItem>
            )}
          </Submenu>
        </Submenu>
        <Separator />
        <MenuItem onClick={this.handleOpenAbout} disabled={showAbout}>About</MenuItem>
        <MenuItem
          leftIcon={<FaTwitter />}
          href='https://twitter.com/bashkos'
          target='_blank'
        >Author</MenuItem>
        <MenuItem
          leftIcon={<FaGithub />}
          href='https://github.com/bashkos/react-ultimate-contextmenu'
          target='_blank'
        >GitHub</MenuItem>
      </Menu>
    </MenuProvider>
  }
}

const mapStateToProps = ({ shop }) => ({
  shop
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Shop)
