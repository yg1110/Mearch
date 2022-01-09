import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { darken } from 'polished'
import { useDispatch } from 'react-redux'
import { AxiosResponse } from 'axios'
import http from '../../Api/http-common'
import Menu from '../present/Menu'
import Theme from '../present/Theme'
import { getStorage, setStorage } from '../../Utils/storage'
import { setProductInfotList, setTheme } from '../../Actions'
import {
  ACTIVE_COLOR, LIGHT, NON_ACTIVE_COLOR, THEME, DARK, FILTER_COLOR, FITLER_CATEGORYS,
} from '../../Constants/Color'
import { filterTagType } from '../../Types'
import Modal from '../present/Modal'

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
`

const ModalButton = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 7rem;
    height: 3rem;
    padding: 1rem;
    background: ${theme.colors.fifth} no-repeat 50%;
    border: 1px solid ${theme.colors.sixth};
    font-weight: bold;
    cursor: pointer;
  `}
`

const Header = () => {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [lightColor, setLightColor] = useState<string>(NON_ACTIVE_COLOR)
  const [darkColor, setDarkColor] = useState<string>(NON_ACTIVE_COLOR)
  const [filterTags, setFilterTags] = useState<filterTagType>({ color: [], category: [] })

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

  useEffect(() => {
    if (getStorage(FILTER_COLOR) === '' && getStorage(FITLER_CATEGORYS) === '') {
      setFilterTags({
        ...filterTags,
        color: [],
        category: [],
      })
    } else if (getStorage(FILTER_COLOR) !== '' && getStorage(FITLER_CATEGORYS) === '') {
      setFilterTags({
        ...filterTags,
        category: [],
        color: JSON.parse(getStorage(FILTER_COLOR)),
      })
    } else if (getStorage(FILTER_COLOR) === '' && getStorage(FITLER_CATEGORYS) !== '') {
      setFilterTags({
        ...filterTags,
        category: JSON.parse(getStorage(FITLER_CATEGORYS)),
        color: [],
      })
    } else {
      setFilterTags({
        ...filterTags,
        category: JSON.parse(getStorage(FITLER_CATEGORYS)),
        color: JSON.parse(getStorage(FILTER_COLOR)),
      })
    }
  }, [])

  const initStorage = () => {
    const color = getStorage(FILTER_COLOR)
    const category = getStorage(FITLER_CATEGORYS)
    if (color === '') {
      setStorage(FILTER_COLOR, '[]')
    }
    if (category === '') {
      setStorage(FITLER_CATEGORYS, '[]')
    }
  }

  useEffect(() => {
    initStorage()
    const filterColor = JSON.parse(getStorage(FILTER_COLOR))
    const filteerCategory = JSON.parse(getStorage(FITLER_CATEGORYS))

    http
      .post('/search', { color: filterColor, Type: filteerCategory })
      .then((res: AxiosResponse) => {
        const { data } = res
        dispatch(setProductInfotList(data))
      })
      .catch(e => {
        console.log(e)
      })
  }, [filterTags])

  const changeFilterColors = (color:string) => {
    if (filterTags.color.includes(color)) {
      const filterColor = filterTags.color.filter((filterColor:string) => filterColor !== color)
      setStorage(FILTER_COLOR, JSON.stringify(filterColor))
      setFilterTags({
        ...filterTags,
        color: filterColor,
      })
    } else {
      const filterColor = filterTags.color.concat(color)
      setStorage(FILTER_COLOR, JSON.stringify(filterColor))
      setFilterTags({
        ...filterTags,
        color: filterColor,
      })
    }
  }

  const changeFilterCategory = (category:string|null) => {
    if (!category) {
      setStorage(FITLER_CATEGORYS, JSON.stringify([]))
      setFilterTags({
        ...filterTags,
        category: [],
      })
      return
    }

    if (filterTags.category.includes(category)) {
      const now = filterTags.category.filter((fitlerCategory:string) => fitlerCategory !== category)
      setStorage(FITLER_CATEGORYS, JSON.stringify(now))
      setFilterTags({
        ...filterTags,
        category: now,
      })
    } else {
      const now = filterTags.category.concat(category)
      setStorage(FITLER_CATEGORYS, JSON.stringify(now))
      setFilterTags({
        ...filterTags,
        category: now,
      })
    }
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
    filterTags,
    changeFilterColors,
    changeFilterCategory,
  }

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <Container>
      <Menu items={menuItems} />
      <ModalButton onClick={openModal}>조합하기</ModalButton>
      <Theme items={themeItems} />
      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
      />
    </Container>
  )
}
export default React.memo(Header)
