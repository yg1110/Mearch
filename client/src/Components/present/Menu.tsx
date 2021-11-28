import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import { ColorPoropsType } from '../../Types'

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

const Item = styled.span`
    ${({ theme }) => css`
        margin: 1rem;
        font-size: 1.2rem;
        font-weight: bold;
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
    ${({ theme }) => css`
        display:inline-block;
        width:2rem;
        height:2rem;
        margin: 0.5rem;
        border: 1px solid ${theme.colors.secondary};
        border-radius:50%;
        background-color: ${(props:ColorPoropsType) => props.color || 'white'};
        &:hover {
            cursor: pointer;
        }
    `}
`

type ItemType = {
  menus : string[],
  colors : string[]
}
interface MenuPropsType {
  items: ItemType
}
const Menu:FC<MenuPropsType> = props => {
  const { menus, colors } = props.items
  return (
    <MenuContents>
      <Items>
        <Category>
          카테고리
        </Category>
        {menus && menus.map(menu => <Item key={menu}>{menu}</Item>)}
      </Items>
      <Items>
        <Category>
          컬러
        </Category>
        {colors && colors.map(color => (
          <Color
            key={color}
            color={color}
          />
        ))}
      </Items>
    </MenuContents>
  )
}
export default React.memo(Menu)
