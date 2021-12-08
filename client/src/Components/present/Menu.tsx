import React, { FC, useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'
import { ColorPoropsType } from '../../Types'
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
  active: boolean
}

const Item = styled.span`
    ${({ theme }) => css`
        margin: 1rem;
        font-size: 1.2rem;
        font-weight: bold;
        color: ${(props:ItmePropsType) => (props.active ? '#3d6eda' : 'rgb(183, 193, 204)')};
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
  background-color: ${(props:ColorPoropsType) => props.color || 'white'};
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
  display: none;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: ${(props:ColorPoropsType) => (props.color === '#ffffff' ? 'black' : 'white')};
`

type ItemType = {
  colorSearch: (index:number) => void,
  categorySearch: (inderx:number) => void
}
interface MenuPropsType {
  items: ItemType,
  categoryIndex: number,
  colorIndex: number
}
const Menu:FC<MenuPropsType> = props => {
  const { colorSearch, categorySearch } = props.items
  const { categoryIndex, colorIndex } = props
  const menuRefs = useRef(new Array(MENUS.length))
  const colorRefs = useRef(new Array(COLORS.length))

  useEffect(() => {
    const { current } = menuRefs
    for (let i = 0; i < current.length; i += 1) {
      if (i === categoryIndex) {
        current[i].style.color = '#3d6eda'
      } else {
        current[i].style.color = 'rgb(183, 193, 204)'
      }
    }
  }, [categoryIndex])

  useEffect(() => {
    const { current } = colorRefs
    for (let i = 0; i < current.length; i += 1) {
      if (i === colorIndex) {
        current[i].style.display = 'block'
      } else {
        current[i].style.display = 'none'
      }
    }
  }, [colorIndex])

  return (
    <MenuContents>
      <Items>
        <Category>
          카테고리
        </Category>
        {MENUS.map((menu:string, index:number) => (
          <Item
            key={menu}
            active={index === 0}
            ref={el => { menuRefs.current[index] = el }}
            onClick={() => categorySearch(index)}
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
          <Palette title={COLOR_LABEL[key]}>
            <Color
              key={color}
              color={color}
              onClick={() => colorSearch(key)}
            />
            <CheckIcon
              color={color}
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
