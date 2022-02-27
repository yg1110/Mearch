import React, { FC, useRef } from 'react'
import { MENUS } from '../../../Constants/Menu'
import {
  Checkboxes, CheckBoxLabel, MultiComboBoxContainer, OverSelect, SelectBox,
} from '../../../Styles/Combobox'

import { MenuPropsType } from '../../../Types'

const MultiCategoryCombobox:FC<MenuPropsType> = props => {
  const { changeFilterCategory } = props.items
  const comboRef = useRef<HTMLDivElement>(null)

  const onShowCheckbox = () => {
    if (comboRef.current !== null) {
      const { display } = comboRef.current.style
      if (display === 'block') {
        comboRef.current.style.display = 'none'
      } else {
        comboRef.current.style.display = 'block'
      }
    }
  }

  const categoryClick = (index:number) => {
    if (index === 0) {
      changeFilterCategory(null)
      return
    }

    changeFilterCategory(MENUS[index])
  }

  return (
    <MultiComboBoxContainer>
      <SelectBox onClick={onShowCheckbox}>
        <select>
          <option>카테고리</option>
        </select>
        <OverSelect />
      </SelectBox>
      <Checkboxes ref={comboRef}>
        {MENUS.map((menu:string, index:number) => (
          <label
            key={index}
            htmlFor={menu}
            onClick={() => categoryClick(index)}
          >
            <input
              type='checkbox'
              id={menu}
            />
            <CheckBoxLabel>{menu}</CheckBoxLabel>
          </label>
        ))}
      </Checkboxes>
    </MultiComboBoxContainer>
  )
}
export default React.memo(MultiCategoryCombobox)
