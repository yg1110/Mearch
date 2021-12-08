import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { darken } from 'polished'
import { useDispatch } from 'react-redux'
import { AxiosResponse } from 'axios'
import http from '../../Api/http-common'
import Menu from '../present/Menu'
import Theme from '../present/Theme'
import { getStorage, setStorage } from '../../Utils/storage'
import { setProductInfotList, setTheme } from '../../Actions'
import { MENUS, COLORS } from '../../Constants/Menu'
import {
  ACTIVE_COLOR, LIGHT, NON_ACTIVE_COLOR, THEME, DARK,
} from '../../Constants/Color'

function Header() {
  const dispatch = useDispatch()
  const [lightColor, setLightColor] = useState(NON_ACTIVE_COLOR)
  const [darkColor, setDarkColor] = useState(NON_ACTIVE_COLOR)
  const [categoryIndex, setCategoryIndex] = useState<number>(0)
  const [colorIndex, setColorIndex] = useState<number>(-1)

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

  const colorSearch = (id:number) => {
    setCategoryIndex(0)
    setColorIndex(id)
    http
      .get('/colors', { params: { color: COLORS[id] } })
      .then((res: AxiosResponse) => {
        const { data } = res
        dispatch(setProductInfotList(data))
      })
      .catch(e => {
        console.log(e)
      })
  }

  const categorySearch = (index:number) => {
    setCategoryIndex(index)
    setColorIndex(-1)
    const category = MENUS[index]
    http
      .get('/category', { params: { category } })
      .then((res: AxiosResponse) => {
        const { data } = res
        dispatch(setProductInfotList(data))
      })
      .catch(e => {
        console.log(e)
      })
  }

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
    MENUS,
    COLORS,
    colorSearch,
    categorySearch,
  }

  const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
  `

  return (
    <Container>
      <Menu
        items={menuItems}
        categoryIndex={categoryIndex}
        colorIndex={colorIndex}
      />
      <Theme items={themeItems} />
    </Container>
  )
}
export default React.memo(Header)
