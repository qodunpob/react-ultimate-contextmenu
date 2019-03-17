import React from 'react'
import styled from '@emotion/styled'
import { FaRegCopyright } from 'react-icons/fa'

const FooterContainer = styled.div`
  padding: 20px 20px 450px;
  text-align: center;
`
const Quote = styled.q`
  font-style: italic;
  color: #888;
`
const Copyright = styled(FaRegCopyright)`
  margin-left: 15px;
  margin-right: 5px;
  vertical-align: middle;
`
const Author = styled.span`
  color: #ccc;
`

const Footer = () => <FooterContainer>
  <Quote>I'm Commander Shepard and this is my favorite store on the Citadel.</Quote>
  <Author><Copyright /> Commander Shepard</Author>
</FooterContainer>

export default Footer
