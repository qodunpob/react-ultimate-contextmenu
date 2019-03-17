import { css } from '@emotion/core'
import styled from '@emotion/styled'

const activeStateColors = ({ active }) => css`
  color: ${active ? '#fff' : '#333'};
  background: ${active ? '#4393e6' : 'none'};
`

const ItemButton = styled.div`
  margin: 0;
  padding: .375em .5em;
  display: flex;
  width: 100%;
  justify-content: space-between;
  box-sizing: border-box;
  font-family: inherit;
  font-size: 1rem;
  text-decoration: none;
  ${activeStateColors}
  border: none;
  cursor: pointer;
  &:hover {
    ${activeStateColors({ active: true })}
  }
  &:disabled,
  &[disabled] {
    pointer-events: none;
    opacity: .5;
  }
`

export default ItemButton
