import React from 'react'

import MenuContext from './MenuContext'
import Portal from './Portal'
import MenuContent from './MenuContent'

const Menu = ({ children, ...otherProps }) => <MenuContext.Consumer>
  {({ visible, x, y }) => visible &&
    <Portal>
      <MenuContent
        targetRect={{
          top: y,
          right: x,
          bottom: y,
          left: x
        }}
        {...otherProps}
      >{children}</MenuContent>
    </Portal>
  }
</MenuContext.Consumer>

export default Menu
