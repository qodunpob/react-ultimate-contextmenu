import { PureComponent } from 'react'
import { createPortal } from 'react-dom'

export default class Portal extends PureComponent {
  menuRoot = document.createElement('div')

  componentDidMount () {
    document.body.appendChild(this.menuRoot)
  }

  componentWillUnmount () {
    document.body.removeChild(this.menuRoot)
  }

  render () {
    const { children } = this.props
    return createPortal(children, this.menuRoot)
  }
}
