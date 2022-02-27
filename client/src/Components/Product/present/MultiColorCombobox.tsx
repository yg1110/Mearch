import React, { FC, useRef } from 'react'
import { COLORS, COLOR_LABEL } from '../../../Constants/Color'
import { Color } from '../../../Styles'
import {
  Checkboxes, MultiComboBoxContainer, OverSelect, Palette, SelectBox,
} from '../../../Styles/Combobox'

import { MenuPropsType } from '../../../Types'

const MultiColorCombobox:FC<MenuPropsType> = props => {
  const { changeFilterColors } = props.items
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

  const colorClick = (key:number) => {
    changeFilterColors(COLORS[key])
  }

  return (
    <MultiComboBoxContainer>
      <SelectBox onClick={onShowCheckbox}>
        <select>
          <option>컬러</option>
        </select>
        <OverSelect />
      </SelectBox>
      <Checkboxes ref={comboRef}>
        {COLORS.map((color:string, key:number) => (
          <label
            key={key}
            htmlFor={color}
          >
            <input
              type='checkbox'
              id={color}
              onClick={() => colorClick(key)}
            />
            <Palette
              title={COLOR_LABEL[key]}
              key={color}
            >
              <Color
                color={color}
                onClick={() => colorClick(key)}
              />
            </Palette>
          </label>
        ))}
      </Checkboxes>
    </MultiComboBoxContainer>
  )
}
export default React.memo(MultiColorCombobox)
