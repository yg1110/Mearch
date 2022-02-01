import React, { FC, useRef } from 'react'
import { COLOR_LABEL, COLORS } from '../../../Constants/Color'
import { MENUS } from '../../../Constants/Menu'
import { Color } from '../../../Styles'
import {
  Category, CheckIcon, Item,
  Items, MenuContents, Palette, MenuItemContainer,
} from '../../../Styles/Menu'
import { MenuPropsType } from '../../../Types'

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
        <MenuItemContainer>
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
        </MenuItemContainer>
      </Items>
      <Items>
        <Category>
          컬러
        </Category>
        <MenuItemContainer>
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
        </MenuItemContainer>
      </Items>
    </MenuContents>
  )
}
export default React.memo(Menu)
