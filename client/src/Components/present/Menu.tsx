import React, { FC, useRef } from 'react'
import styled, { css } from 'styled-components'
import { ColorPoropsType, filterTagType } from '../../Types'
import { COLOR_LABEL } from '../../Constants/Color'
import { MENUS, COLORS } from '../../Constants/Menu'

const MenuContents = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`
const Category = styled.div`
    ${({ theme }) => css`
        display: flex;
        align-items: center;
        color: ${theme.colors.royalblue};
        font-size: 1.5rem;
        width: 7rem;
        justify-content: center;
        font-weight: bold;
    `}
`

const Items = styled.div`
  display: flex;
`

type ItmePropsType = {
  children: string
  filterCategorys: string[]
}

const Item = styled.span<ItmePropsType>`
  ${({ theme }) => css`
    margin: 1rem;
    font-size: 1.2rem;
    font-weight: bold;
    color: ${(props:ItmePropsType) => {
    if (props.filterCategorys.length === 0) {
      return props.children === '전체' ? '#3d6eda' : 'rgb(183, 193, 204)'
    }

    return props.filterCategorys.includes(props.children) ? '#3d6eda' : 'rgb(183, 193, 204)'
  }
};
    &::after{
      display:block;
      content: '';
      border-bottom: solid 2px ${theme.colors.royalblue};  
      transform: scaleX(0);
      transition: transform 250ms ease-in-out;
    }
    &:hover:after{
      transform: scaleX(1);
    }
    &:hover{
      cursor: pointer;
    }
  `}
`

const Color = styled.div`
  display:inline-block;
  width:2rem;
  height:2rem;
  margin: 0.5rem;
  border: 1px solid ${(props:ColorPoropsType) => (props.color === '#ffffff' ? '#e8ebed' : props.color)};
  border-radius:50%;
  background-color: ${(props:ColorPoropsType) => (props.color || 'white')};
  &:hover {
      cursor: pointer;
  }
`

const Palette = styled.div`
  position: relative;
  width: 3rem;
  height: 3rem;
`

const CheckIcon = styled.div`
  display: ${((props:ColorPoropsType) => {
    if (props.filterColors) {
      return props.filterColors.includes(props.color) ? 'block' : 'none'
    }
    return 'none'
  })};
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: ${((props:ColorPoropsType) => {
    const condition1 = props.color === '#ffffff'
    const condition2 = props.color === '#ffea00'
    const condition3 = props.color === '#ceef00'
    return (condition1 || condition2 || condition3) ? 'black' : 'white'
  })};
`

type ItemType = {
  changeFilterColors: (color:string) => void,
  changeFilterCategory: (category:string|null) => void,
  filterTags:filterTagType
}
interface MenuPropsType {
  items: ItemType,
}
const Menu:FC<MenuPropsType> = props => {
  const { filterTags, changeFilterColors, changeFilterCategory } = props.items
  const menuRefs = useRef(new Array(MENUS.length))
  const colorRefs = useRef(new Array(COLORS.length))

  const categoryClick = (index:number) => {
    if (index === 0) {
      changeFilterCategory(null)
      return
    }

    changeFilterCategory(MENUS[index])
  }

  const colorClick = (key:number) => {
    const { current } = colorRefs
    const isVisible = current[key].style.display
    if (isVisible === 'none' || isVisible === '') {
      current[key].style.display = 'block'
    } else {
      current[key].style.display = 'none'
    }
    changeFilterColors(COLORS[key])
  }

  return (
    <MenuContents>
      <Items>
        <Category>
          카테고리
        </Category>
        {MENUS.map((menu:string, index:number) => (
          <Item
            key={menu}
            filterCategorys={filterTags.category}
            ref={el => { menuRefs.current[index] = el }}
            onClick={() => categoryClick(index)}
          >
            {menu}
          </Item>
        ))}
      </Items>
      <Items>
        <Category>
          컬러
        </Category>
        {COLORS.map((color:string, key:number) => (
          <Palette
            title={COLOR_LABEL[key]}
            key={color}
          >
            <Color
              color={color}
              onClick={() => colorClick(key)}
            />
            <CheckIcon
              color={color}
              filterColors={filterTags.color}
              ref={el => { colorRefs.current[key] = el }}
            >
              &#8730;
            </CheckIcon>
          </Palette>
        ))}
      </Items>
    </MenuContents>
  )
}
export default React.memo(Menu)
