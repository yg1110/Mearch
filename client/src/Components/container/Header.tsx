import React, { useEffect, useState } from 'react'
import { darken } from 'polished'
import { useDispatch } from 'react-redux'
import Menu from '../present/Menu'
import Theme from '../present/Theme'
import { getStorage, setStorage } from '../../Utils/storage'
import { setProductInfotList, setTheme } from '../../Middleware/Actions'
import {
  ACTIVE_COLOR, LIGHT, NON_ACTIVE_COLOR,
  THEME, DARK, FILTER_COLOR, FITLER_CATEGORYS,
} from '../../Constants/Color'
import { filterTagType } from '../../Types'
import Modal from './Modal'
import RestService from '../../Api/http-common'

import { Button, Container } from '../../Styles'

const Header = () => {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [lightColor, setLightColor] = useState<string>(NON_ACTIVE_COLOR)
  const [darkColor, setDarkColor] = useState<string>(NON_ACTIVE_COLOR)
  const [filterTags, setFilterTags] = useState<filterTagType>({ color: [], category: [] })

  // 현재 테마에 따른 테마 아이콘 색 변경
  const changeThemeIconColor = () => {
    const theme = getStorage(THEME)
    if (theme === LIGHT) {
      setLightColor(ACTIVE_COLOR)
      setDarkColor(NON_ACTIVE_COLOR)
    } else {
      setLightColor(NON_ACTIVE_COLOR)
      setDarkColor(ACTIVE_COLOR)
    }
  }

  // 필터 카테고리와 필터 컬러 로컬스토리지 초기화
  const initFilterStorage = () => {
    const color = getStorage(FILTER_COLOR)
    const category = getStorage(FITLER_CATEGORYS)
    if (color === '') {
      setStorage(FILTER_COLOR, '[]')
    }
    if (category === '') {
      setStorage(FITLER_CATEGORYS, '[]')
    }
  }

  // 필터 카테고리와 필터 컬러 스토리지를 파싱해서 배열로 리턴
  const parseFilterStorage = () => {
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
  }

  // 파싱한 필터 카테고리와 필터 컬러를 파라미터로 API 이용하여 DB 요청
  // 컬러와 카테고리는 and조회
  // 각 칼럼들은 여러 종류일 경우 or을 사용하여 다중검색
  const getSearchProductInfoList = async () => {
    const filterColor = JSON.parse(getStorage(FILTER_COLOR))
    const filteerCategory = JSON.parse(getStorage(FITLER_CATEGORYS))
    const { data, message } = await RestService.getSearchProductInfoList(filterColor, filteerCategory)

    if (message === 'success') {
      dispatch(setProductInfotList(data))
    } else {
      // error
      console.log(message)
    }
  }

  // 선택된 컬러를 한번 더 누를 경우 선택 해제
  // 선택되지 않는 컬러를 누를 경우 기존 배열에 추가
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

  // 선택된 카테고리를 한번 더 누를 경우 선택 해제
  // 선택되지 않는 카테고리를 누를 경우 기존 배열에 추가
  const changeFilterCategory = (category:string|null) => {
    if (!category) {
      setStorage(FITLER_CATEGORYS, '[]')
      setFilterTags({
        ...filterTags,
        category: [],
      })
      return
    }

    if (filterTags.category.includes(category)) {
      const filterCategory = filterTags.category.filter((fitlerCategory:string) => fitlerCategory !== category)
      setStorage(FITLER_CATEGORYS, JSON.stringify(filterCategory))
      setFilterTags({
        ...filterTags,
        category: filterCategory,
      })
    } else {
      const filterCategory = filterTags.category.concat(category)
      setStorage(FITLER_CATEGORYS, JSON.stringify(filterCategory))
      setFilterTags({
        ...filterTags,
        category: filterCategory,
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

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    parseFilterStorage()
  }, [])

  useEffect(() => {
    changeThemeIconColor()
  }, [getStorage(THEME)])

  useEffect(() => {
    initFilterStorage()
    getSearchProductInfoList()
  }, [filterTags])

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

  return (
    <Container>
      <Menu items={menuItems} />
      <Button
        onClick={openModal}
        width='7rem'
      >
        조합하기
      </Button>
      <Theme items={themeItems} />
      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
      />
    </Container>
  )
}
export default React.memo(Header)
