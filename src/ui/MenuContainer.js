import styled from '@emotion/styled'

const MenuContainer = styled.div`
  margin: 5px;
  float: left; /* prevent margin collapse */
  background: #fff;
  box-shadow: 0 10px 20px rgba(0, 0, 0, .3), 0 0 0 1px #eee;
  & & {
    margin: -5px;
  }
`

export default MenuContainer
