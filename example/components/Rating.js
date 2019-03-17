import React from 'react'
import styled from '@emotion/styled'
import { FaRegStar, FaStar } from 'react-icons/fa'

const StarList = styled.ul`
  margin: 0;
  padding: 0;
  display: inline-flex;
  list-style: none;
  font-size: 16px;
  vertical-align: middle;
`
const Star = styled.li`
  margin: 0 2px 0 0;
  padding: 0;
  color: #ff851b;
  &:last-child {
    margin-right 0;
  }
`
const Rating = ({ rating }) => <StarList>
  {Array(5).fill(null).map((entry, value) => <Star key={value}>
    {rating > value ? <FaStar /> : <FaRegStar />}
  </Star>)}
</StarList>

export default Rating
