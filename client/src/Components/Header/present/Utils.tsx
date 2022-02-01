import React, { FC, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  UtilsList, SvgButton, MobileButton, SildeMenuContent, SildeHeader,
  SildeCloseButton, SildeText, SildeContent, SearchMenuContent,
  SearchInput, SearchContent, SearchTag,
} from '../../../Styles/Header'
import RestService from '../../../Api/http-common'
import { LIGHT_COLOR, DARK_COLOR } from '../../../Constants/Color'
import { ReactComponent as Dark } from '../../../Assets/dark.svg'
import { ReactComponent as Light } from '../../../Assets/light.svg'
import { ReactComponent as Search } from '../../../Assets/search.svg'
import { ReactComponent as Menu } from '../../../Assets/menu.svg'
import Logo from './Logo'
import { NAVIGATIONLIST } from '../../../Constants/Menu'
import { setProductInfotList } from '../../../Middleware/Actions'

type ItemType = {
    changeTheme: () => void,
    isLight: boolean
}
interface ThemePropsType {
    items: ItemType
}

const Utils:FC<ThemePropsType> = (props:ThemePropsType) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const sildeRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)
  const tagRef = useRef<HTMLSelectElement>(null)
  const { changeTheme, isLight } = props.items

  const closeSilde = () => {
    if (sildeRef.current !== null) {
      sildeRef.current.style.transform = 'translateX(100%)'
    }
  }

  const openSilde = () => {
    if (sildeRef.current !== null) {
      sildeRef.current.style.transform = 'translateX(0)'
    }
  }

  const openSearch = () => {
    if (searchRef.current !== null) {
      searchRef.current.style.opacity = '1'
      searchRef.current.style.transform = 'translateY(0)'
    }
  }

  const closeSearch = () => {
    if (searchRef.current !== null) {
      searchRef.current.style.opacity = '0'
      searchRef.current.style.transform = 'translateY(-100%)'
    }
  }

  const getTagSearch = async (tag:string, value:string) => {
    const { data, message } = await RestService.getTagSearch(tag, value)

    if (message === 'success') {
      dispatch(setProductInfotList(data))
      closeSearch()
    } else {
      console.log(message)
    }
  }

  const onSearch = (e:React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const input = e.target as HTMLInputElement
      if (tagRef.current !== null) {
        const { value } = tagRef.current
        const isNumber = /\d/
        if (value === 'price') {
          if (isNumber.test(input.value)) {
            getTagSearch(value, input.value)
          } else {
            alert('숫자만 입력해주세요.')
            input.value = ''
          }
        } else {
          getTagSearch(value, input.value)
        }
      }
    }
  }

  const onChangePage = (e:React.MouseEvent<HTMLHeadElement>) => {
    const h1 = e.target as HTMLHeadElement

    switch (h1.innerText) {
      case '목록보기': {
        navigate('/')
        break
      }
      case '목록 업데이트': {
        navigate('/updateproduct')
        break
      }
      case '조합 선택하기': {
        navigate('/selectcloset')
        break
      }
      case '조합 추가하기': {
        navigate('/makecloset')
        break
      }
      default: {
        break
      }
    }
    closeSilde()
  }

  return (
    <UtilsList>
      <SvgButton>
        {isLight
          ? <Search
              onClick={openSearch}
              fill={DARK_COLOR}
              width='24px'
              height='24px'
          />
          : <Search
              onClick={openSearch}
              fill={LIGHT_COLOR}
              width='24px'
              height='24px'
          />}
      </SvgButton>
      <SvgButton>
        {isLight
          ? <Light
              onClick={() => changeTheme()}
              fill={DARK_COLOR}
              width='24px'
              height='24px'
          />
          : <Dark
              onClick={() => changeTheme()}
              fill={LIGHT_COLOR}
              width='24px'
              height='24px'
          />}
      </SvgButton>
      <MobileButton>
        {isLight
          ? <Menu
              onClick={openSilde}
              fill={DARK_COLOR}
              width='24px'
              height='24px'
          />
          : <Menu
              onClick={openSilde}
              fill={LIGHT_COLOR}
              width='24px'
              height='24px'
          />}
      </MobileButton>
      <SildeMenuContent ref={sildeRef}>
        <SildeHeader>
          <Logo />
          <SildeCloseButton onClick={closeSilde}>x</SildeCloseButton>
        </SildeHeader>
        <SildeContent>
          {NAVIGATIONLIST.map(nav => (
            <SildeText
              key={nav}
              onClick={onChangePage}
            >
              {nav}
            </SildeText>
          ))}
        </SildeContent>
      </SildeMenuContent>
      <SearchMenuContent ref={searchRef}>
        <SildeHeader>
          <Logo />
          <SildeCloseButton onClick={closeSearch}>x</SildeCloseButton>
        </SildeHeader>
        <SearchContent>
          <SearchTag ref={tagRef}>
            <option value='name'>이름</option>
            <option value='price'>가격</option>
          </SearchTag>
          <SearchInput
            placeholder='어떤 상품이 궁금하신가요?'
            onKeyDown={(e:React.KeyboardEvent<HTMLInputElement>) => onSearch(e)}
          />
        </SearchContent>
      </SearchMenuContent>
    </UtilsList>
  )
}
export default React.memo(Utils)
