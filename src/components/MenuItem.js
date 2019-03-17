import React from 'react'

import FilterContext from './FilterContext'
import MenuContext from './MenuContext'
import ItemContainer from '../ui/ItemContainer'
import ItemButton from '../ui/ItemButton'
import ItemInner from '../ui/ItemInner'
import ItemLabel from '../ui/ItemLabel'
import LeftIcon from '../ui/LeftIcon'
import RightIcon from '../ui/RightIcon'
import getChildrenText from '../utils/getChildrenText'

const MenuItem = ({ leftIcon, rightIcon, disabled, href, children, ...otherProps }) =>
  <FilterContext.Consumer>
    {({ filter }) => {
      let visible = true
      if (filter) {
        const text = getChildrenText(children).toUpperCase()
        if (text.indexOf(filter.toUpperCase()) === -1) {
          visible = false
        }
      }

      return visible && <MenuContext.Consumer>
        {({ closeMenu }) =>
          <ItemContainer onClick={disabled ? null : closeMenu}>
            <ItemButton
              as={href ? 'a' : 'button'}
              href={href}
              disabled={disabled}
              {...otherProps}
            >
              <ItemInner>
                <LeftIcon>{leftIcon}</LeftIcon>
                <ItemLabel>{children}</ItemLabel>
              </ItemInner>
              {rightIcon && <RightIcon>{rightIcon}</RightIcon>}
            </ItemButton>
          </ItemContainer>
        }
      </MenuContext.Consumer>
    }}

  </FilterContext.Consumer>

export default MenuItem
