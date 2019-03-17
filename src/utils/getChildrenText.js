import { Children } from 'react'

const getChildrenText = (children) => Children.map(children, child =>
  typeof child === 'string'
    ? child
    : getChildrenText(child.props.children)
).join('')

export default getChildrenText
