import { createContext } from 'react'

const FilterContext = createContext({
  filter: '',
  updateFilter: () => {}
})

export default FilterContext
