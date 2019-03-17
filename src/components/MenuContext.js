import { createContext } from 'react'

const MenuContext = createContext({
  visible: false,
  x: 0,
  y: 0,
  closeMenu: () => {}
})

export default MenuContext
