import React, { useContext, useState, FC } from 'react'
import { ColorSetPropsType, DataContextValues } from '../../Types'
import { DataContext } from '../container/Modal'
import { COLORS } from '../../Constants/Color'
import { ReactComponent as Top } from '../../Assets/top.svg'
import { ReactComponent as Bottom } from '../../Assets/bottom.svg'
import { Button } from '../../Styles'
import {
  Close, ClosetColorSetting, MakeCloset,
  Palette, ColorSetting, Color, ButtonCenterContainer,
} from '../../Styles/Modal'

export const MakeClosetContent:FC<ColorSetPropsType> = props => {
  const { closeMakeModal, makeContentRef } = useContext(DataContext) as DataContextValues
  const [topFillColor, setTopFillColor] = useState<string>('#000000')
  const [bottomFillColor, setBottomFillColor] = useState<string>('#000000')
  const COLORS1 = COLORS.slice(0, COLORS.length / 2)
  const COLORS2 = COLORS.slice(COLORS.length / 2, COLORS.length)
  const { colorSet } = props

  const onChangeTopClothColor = (color:string) => {
    setTopFillColor(color)
  }

  const onChangeBottomClothColor = (color:string) => {
    setBottomFillColor(color)
  }

  const onSubmitCloset = () => {
    // colorSet.push([topFillColor, bottomFillColor])
    closeMakeModal()
  }

  return (
    <MakeCloset
      ref={makeContentRef}
    >
      <Close onClick={closeMakeModal}>x</Close>
      <ClosetColorSetting>
        <Top
          fill={topFillColor}
          height='5rem'
        />
        <Palette>
          <ColorSetting>
            {COLORS1.map((color:string) => (<Color
              key={color}
              color={color}
              onClick={() => onChangeTopClothColor(color)}
            />))}
          </ColorSetting>
          <ColorSetting>
            {COLORS2.map((color:string) => (<Color
              key={color}
              color={color}
              onClick={() => onChangeTopClothColor(color)}
            />))}
          </ColorSetting>
        </Palette>
      </ClosetColorSetting>
      <ClosetColorSetting>
        <Bottom
          fill={bottomFillColor}
          height='5rem'
        />
        <Palette>
          <ColorSetting>
            {COLORS1.map(color => (<Color
              key={color}
              color={color}
              onClick={() => onChangeBottomClothColor(color)}
            />))}
          </ColorSetting>
          <ColorSetting>
            {COLORS2.map(color => (<Color
              key={color}
              color={color}
              onClick={() => onChangeBottomClothColor(color)}
            />))}
          </ColorSetting>
        </Palette>
      </ClosetColorSetting>
      <ButtonCenterContainer>
        <Button
          width='15rem'
          onClick={onSubmitCloset}
        >
          옷 조합 완료
        </Button>
      </ButtonCenterContainer>
    </MakeCloset>
  )
}
