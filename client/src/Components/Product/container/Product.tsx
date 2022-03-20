import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FILTER_COLOR, FITLER_CATEGORYS, LIGHT } from '../../../Constants/Color'
import { setLoader, setProductInfotList } from '../../../Middleware/Actions'
import { ProductContainer } from '../../../Styles/Product'
import { filterTagType, StateType } from '../../../Types'
import { getStorage, setStorage } from '../../../Utils/storage'
import Menu from '../present/Menu'
import ProductList from '../present/ProductList'
import RestService from '../../../Api/http-common'
import MultiCategoryCombobox from '../present/MultiCategoryCombobox'
import MultiColorCombobox from '../present/MultiColorCombobox'
import { MobileMenuContainer } from '../../../Styles/Menu'
import Loader from '../../../Pages/Loader'

const Product = () => {
  const dispatch = useDispatch()
  const product = useSelector((state:StateType) => state.product)
  const [filterTags, setFilterTags] = useState<filterTagType>({ color: [], category: [] })

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

  // 파싱한 필터 카테고리와 필터 컬러를 파라미터로 API 이용하여 DB 요청
  // 컬러와 카테고리는 and조회
  // 각 칼럼들은 여러 종류일 경우 or을 사용하여 다중검색
  const getSearchProductInfoList = async () => {
    dispatch(setLoader(true))
    const filterColor = JSON.parse(getStorage(FILTER_COLOR))
    const filteerCategory = JSON.parse(getStorage(FITLER_CATEGORYS))
    const { data, success } = await RestService.getSearchProductInfoList(filterColor, filteerCategory)

    if (success) {
      dispatch(setProductInfotList(data))
      dispatch(setLoader(false))
    } else {
      // error
      console.error(data.message)
      dispatch(setLoader(false))
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
    getSearchProductInfoList()
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
      getSearchProductInfoList()
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
    getSearchProductInfoList()
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

  useEffect(() => {
    initFilterStorage()
    parseFilterStorage()
    getSearchProductInfoList()
  }, [])

  const menuItems = {
    filterTags,
    changeFilterColors,
    changeFilterCategory,
  }

  const theme = useSelector((state:StateType) => state.theme)
  const isLoad = useSelector((state:StateType) => state.isLoad)
  return (
    <React.Fragment>
      {isLoad
        ? <Loader
            type='cylon'
            color={theme === LIGHT ? 'black' : 'white'}
        /> : (
          <React.Fragment>
            <Menu items={menuItems} />
            <MobileMenuContainer>
              <MultiCategoryCombobox items={menuItems} />
              <MultiColorCombobox items={menuItems} />
            </MobileMenuContainer>
            <ProductContainer>
              <ProductList items={product} />
            </ProductContainer>
          </React.Fragment>
        )}
    </React.Fragment>
  )
}
export default React.memo(Product)
