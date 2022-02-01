import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Logo from './present/Logo'
import Nav from './present/Nav'
import Utils from './present/Utils'

import { getStorage, setStorage } from '../../Utils/storage'
import { setTheme } from '../../Middleware/Actions'
import { LIGHT, THEME, DARK } from '../../Constants/Color'
import { Container } from '../../Styles/Header'

const Header = () => {
  const dispatch = useDispatch()

  const [isLight, setIsLight] = useState<boolean>(getStorage(THEME) === LIGHT)

  const changeTheme = () => {
    if (isLight) {
      setIsLight(false)
      setStorage(THEME, DARK)
      dispatch(setTheme(DARK))
    } else {
      setIsLight(true)
      setStorage(THEME, LIGHT)
      dispatch(setTheme(LIGHT))
    }
  }

  const themeItems = {
    changeTheme,
    isLight,
  }
  return (
    <Container>
      <Logo />
      <Nav />
      <Utils items={themeItems} />
    </Container>
  )
}
export default React.memo(Header)
