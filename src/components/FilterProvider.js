import React, { PureComponent } from 'react'

import FilterContext from './FilterContext'

export default class FilterProvider extends PureComponent {
  updateFilter = (filter) => {
    this.setState({ filter })

    const { onFilterUpdate } = this.props
    if (typeof onFilterUpdate === 'function') {
      setTimeout(onFilterUpdate)
    }
  }

  state = {
    filter: '',
    updateFilter: this.updateFilter
  }

  render () {
    const { children } = this.props
    return <FilterContext.Provider value={this.state}>
      {children}
    </FilterContext.Provider>
  }
}
