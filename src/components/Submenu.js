import React, { PureComponent, Fragment, createRef } from 'react'
import { FaAngleRight } from 'react-icons/fa'

import FilterContext from './FilterContext'
import SubmenuContext from './SubmenuContext'
import MenuContent from './MenuContent'
import ItemContainer from '../ui/ItemContainer'
import ItemButton from '../ui/ItemButton'
import ItemInner from '../ui/ItemInner'
import ItemLabel from '../ui/ItemLabel'
import LeftIcon from '../ui/LeftIcon'
import RightIcon from '../ui/RightIcon'

export default class Submenu extends PureComponent {
  static overDelay = 250
  static outDelay = 750

  el = createRef()

  handleMouseOver = () => {
    if (this.hoverTimeoutId) {
      clearTimeout(this.hoverTimeoutId)
    }

    this.hoverTimeoutId = setTimeout(() => {
      this.setState({ hover: true })
    }, Submenu.overDelay)

    this.setState({ active: true })
  }

  handleMouseOut = () => {
    if (this.hoverTimeoutId) {
      clearTimeout(this.hoverTimeoutId)
    }

    this.hoverTimeoutId = setTimeout(() => {
      this.setState({ hover: false })
    }, Submenu.outDelay)

    this.setState({ active: false })
  }

  handleFocus = () => {
    this.setState({ focus: true })
  }

  handleBlur = () => {
    this.setState({ focus: false })
  }

  state = {
    hover: false,
    focus: false,
    active: false
  }

  componentWillUnmount () {
    if (this.hoverTimeoutId) {
      clearTimeout(this.hoverTimeoutId)
    }
  }

  render () {
    const { icon, label, disabled, children } = this.props
    const { hover, focus, active } = this.state
    const visible = (hover || focus) && !disabled

    return <FilterContext.Consumer>
      {({ filter }) => label.indexOf(filter) > -1 && <SubmenuContext.Consumer>
        {({ portal }) =>
          <Fragment>
            <ItemContainer>
              <ItemButton
                ref={this.el}
                active={(active) && !disabled}
                disabled={disabled}
                onMouseOver={this.handleMouseOver}
                onMouseOut={this.handleMouseOut}
              >
                <ItemInner>
                  <LeftIcon>{icon}</LeftIcon>
                  <ItemLabel>{label}</ItemLabel>
                </ItemInner>
                <RightIcon><FaAngleRight /></RightIcon>
              </ItemButton>
            </ItemContainer>
            {visible && <portal.type {...portal.props}>
              <MenuContent
                targetRect={this.el.current.getBoundingClientRect()}
                onMouseOver={this.handleMouseOver}
                onMouseOut={this.handleMouseOut}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
              >{children}</MenuContent>
            </portal.type>}
          </Fragment>
        }
      </SubmenuContext.Consumer>}
    </FilterContext.Consumer>
  }
}
