import React from 'react'
import styled from '@emotion/styled'
import { FaTimesCircle } from 'react-icons/fa'

const FilterContainer = styled.div`
  padding: 3px 10px;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #888;
  background: #eee;
  border-radius: 10px;
`
const FilterClose = styled.button`
  margin-left: 10px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: 0;
  opacity: .3;
  cursor: pointer;
  transition-duration: .5s;
  &:hover {
    opacity: .5;
  }
`

const Filter = ({ onFilterClear, children }) => <FilterContainer>
  <span>{children}</span>
  <FilterClose title='Clear' onClick={onFilterClear}><FaTimesCircle /></FilterClose>
</FilterContainer>

export default Filter
