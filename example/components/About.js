import React from 'react'
import styled from '@emotion/styled'
import { FaTimes } from 'react-icons/fa'

const Popup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, .5);
`
const Modal = styled.article`
  padding: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 600px;
  box-sizing: border-box;
  background: #fff;
  box-shadow: 0 10px 20px rgba(0, 0, 0, .3), 0 0 0 1px #eee;
  transform: translate3d(-50%, -50%, 0);
`
const ModalHeader = styled.header`
  margin-bottom: 1.5em;
  padding: 0 0 1em;
  text-align: center;
  border-bottom: 3px solid;
`
const ModalTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
`
const ShopTitle = styled.span`
  text-transform: uppercase;
`
const ModalText = styled.div`
  margin: 0;
  line-height: 1.6;
`
const Selected = styled.span`
  padding: 0 5px;
  display: inline-block;
  font-size: .85em;
  line-height: 1.4;
  background: #efefef;
  border: 1px solid #ccc;
`
const CloseButton = styled.button`
  padding: 0;
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 18px;
  background: none;
  border: none;
  opacity: .5;
  transition-duration: .5s;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`

const About = ({ handleCloseAbout }) => <Popup onClick={handleCloseAbout}>
  <Modal onClick={e => { e.stopPropagation() }}>
    <ModalHeader>
      <ModalTitle>About <ShopTitle>"The ever best shop of good things"</ShopTitle></ModalTitle>
    </ModalHeader>
    <ModalText>
      <p>
        This is not a real shop, but an example of <Selected>react-ultimate-contextmenu</Selected> works.
        Just right-click anywhere to see.
      </p>
      <p>If you want to buy something, please go to <Selected>{'<HERE COULD BE YOUR STORE NAME>'}</Selected>.</p>
      <p>
        If you have questions or suggestions,
        please look at <a href='https://github.com/bashkos/react-ultimate-contextmenu' target='_blank'>GitHub</a>
      </p>
    </ModalText>
    <CloseButton title='Close' onClick={handleCloseAbout}><FaTimes /></CloseButton>
  </Modal>
</Popup>

export default About
