import React, { PureComponent } from 'react'

import MenuContext from './MenuContext'

export default class MenuProvider extends PureComponent {
  openMenu = (x, y) => {
    this.setState({
      visible: true,
      x,
      y
    })
  }

  closeMenu = () => {
    if (this.state.visible) {
      this.setState({ visible: false })
    }
  }

  handleContextMenu = e => {
    e.preventDefault()
    e.stopPropagation()
    this.openMenu(e.clientX, e.clientY)
  }

  state = {
    visible: false,
    x: 0,
    y: 0,
    closeMenu: this.closeMenu
  }

  componentDidMount () {
    window.addEventListener('mousedown', this.closeMenu)
    window.addEventListener('resize', this.closeMenu)
  }

  componentWillUnmount () {
    window.removeEventListener('mousedown', this.closeMenu)
    window.removeEventListener('resize', this.closeMenu)
  }

  render () {
    const { children, ...otherProps } = this.props
    return <div onContextMenu={this.handleContextMenu} {...otherProps}>
      <MenuContext.Provider value={this.state}>
        {children}
      </MenuContext.Provider>
    </div>
  }
}
