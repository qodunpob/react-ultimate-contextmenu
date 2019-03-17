import React, { PureComponent, createRef } from 'react'
import { createPortal } from 'react-dom'
import { Scrollbars } from 'react-custom-scrollbars'
import { css } from '@emotion/core'
import styled from '@emotion/styled'

import SubmenuContext from './SubmenuContext'
import FilterProvider from './FilterProvider'
import MenuContainer from '../ui/MenuContainer'

const menuPosition = ({ top, left, visibility }) => css`
  top: ${top}px;
  left: ${left}px;
  visibility: ${visibility};
  &:not(:last-of-type) {
    display: none;
  }
`
const MenuBox = styled.div`
  position: absolute;
  ${menuPosition}
`
const portalPosition = ({ top, left }) => css`
  top: -${top}px;
  left: -${left}px;
`
const PortalBox = styled.div`
  position: absolute;
  ${portalPosition}
`

const SubmenuPortal = ({ el, children }) => createPortal(children, el)

export default class MenuContent extends PureComponent {
  el = createRef()
  portalEl = createRef()

  setPosition = (update = false) => {
    const {
      targetRect: {
        top: targetTop,
        right: targetRight,
        bottom: targetBottom,
        left: targetLeft
      }
    } = this.props
    const {
      width,
      height
    } = this.el.current.getBoundingClientRect()
    const {
      scrollTop,
      scrollLeft,
      clientHeight,
      clientWidth
    } = document.documentElement
    let { top, left } = this.state

    if (targetTop + height > clientHeight) {
      if (targetBottom >= height) {
        top = scrollTop + targetBottom - height
      } else {
        top = scrollTop
      }
    } else {
      top = scrollTop + targetTop
    }

    if (!update) {
      if (targetRight + width > clientWidth && targetLeft >= width) {
        left = scrollLeft + targetLeft - width
      } else {
        left = scrollLeft + targetRight
      }
    }

    this.setState({
      top,
      left,
      visibility: 'visible'
    })
  }

  handleMouseDown = e => {
    e.stopPropagation()
  }

  handleFilterUpdate = () => {
    this.setPosition(true)
  }

  state = {
    top: 0,
    left: 0,
    visibility: 'hidden',
    portal: null
  }

  componentDidMount () {
    this.setState({
      portal: <SubmenuPortal el={this.portalEl.current} />
    })

    setTimeout(this.setPosition)
  }

  render () {
    const { children, ...otherProps } = this.props
    const { top, left, visibility, portal } = this.state

    return <MenuBox ref={this.el} top={top} left={left} visibility={visibility}>
      <MenuContainer onMouseDown={this.handleMouseDown} {...otherProps}>
        <Scrollbars
          autoHide
          autoHeight
          autoHeightMax={document.documentElement.clientHeight * 0.85}
        >
          <SubmenuContext.Provider value={{ portal }}>
            <FilterProvider onFilterUpdate={this.handleFilterUpdate}>
              {children}
            </FilterProvider>
          </SubmenuContext.Provider>
        </Scrollbars>
        <PortalBox ref={this.portalEl} top={top} left={left} />
      </MenuContainer>
    </MenuBox>
  }
}
