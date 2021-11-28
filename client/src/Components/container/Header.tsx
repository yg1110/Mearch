import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { darken } from 'polished'
import { useDispatch } from 'react-redux'
import Menu from '../present/Menu'
import Theme from '../present/Theme'
import { getStorage, setStorage } from '../../Utils/storage'
import { setTheme } from '../../Actions'

import {
  ACTIVE_COLOR, LIGHT, NON_ACTIVE_COLOR, THEME, DARK,
} from '../../Constants/Color'

function Header() {
  const dispatch = useDispatch()
  const [lightColor, setLightColor] = useState(NON_ACTIVE_COLOR)
  const [darkColor, setDarkColor] = useState(NON_ACTIVE_COLOR)

  useEffect(() => {
    const theme = getStorage(THEME)
    if (theme === LIGHT) {
      setLightColor(ACTIVE_COLOR)
      setDarkColor(NON_ACTIVE_COLOR)
    } else {
      setLightColor(NON_ACTIVE_COLOR)
      setDarkColor(ACTIVE_COLOR)
    }
  }, [getStorage(THEME)])

  const menus:string[] = ['상의', '바지', '아우터', '신발', '가방', '모자']
  const colors:string[] = [
    '#ed1917',
    '#f4a924',
    '#f5d422',
    '#f1f223',
    '#a6dc0e',
    '#35B400',
    '#99D0E9',
    '#3132FD',
    '#1C2C85',
    '#FFFFFF',
    '#C6C6C6',
    '#1A1A1A',
  ]

  const changeLightTheme = () => {
    setStorage(THEME, LIGHT)
    dispatch(setTheme(LIGHT))
  }

  const changeDarkTheme = () => {
    setStorage(THEME, DARK)
    dispatch(setTheme(DARK))
  }

  const themeButtonHover = (theme:string) => {
    if (theme === LIGHT) {
      setLightColor(darken(0.2, ACTIVE_COLOR))
    } else {
      setDarkColor(darken(0.2, ACTIVE_COLOR))
    }
  }

  const themeButtonLeave = () => {
    const theme = getStorage(THEME)

    if (theme === LIGHT) {
      setLightColor(ACTIVE_COLOR)
      setDarkColor(NON_ACTIVE_COLOR)
    } else {
      setLightColor(NON_ACTIVE_COLOR)
      setDarkColor(ACTIVE_COLOR)
    }
  }

  const themeItems = {
    lightColor,
    darkColor,
    changeLightTheme,
    changeDarkTheme,
    themeButtonHover,
    themeButtonLeave,
  }

  const menuItems = {
    menus,
    colors,
  }

  const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
  `

  return (
    <Container>
      <Menu items={menuItems} />
      <Theme items={themeItems} />
    </Container>
  )
}
export default React.memo(Header)
