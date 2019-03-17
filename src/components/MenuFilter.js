import React, { PureComponent } from 'react'
import styled from '@emotion/styled'

import FilterContext from './FilterContext'

const MenuFilterContainer = styled.div`
  padding: 1em;
`
const MenuFilterField = styled.input`
  padding: 0 .625em;
  width: 100%;
  min-width: 16em;
  box-sizing: border-box;
  font-family: inherit;
  font-size: 1rem;
  line-height: 2;
  border: 1px solid rgba(0, 0, 0, .2);
  border-radius: 3px;
`

export default class MenuFilter extends PureComponent {
  static contextType = FilterContext

  handleChange = e => {
    const { value } = e.target
    const { updateFilter } = this.context
    updateFilter(value)
  }

  render () {
    const { available } = this.props
    const { filter } = this.context
    return !!available && <MenuFilterContainer>
      <MenuFilterField value={filter} onChange={this.handleChange} />
    </MenuFilterContainer>
  }
}
