import React, { FC } from 'react'
import { Container, ClosetColorSetting, Palette, SvgContent } from '../../../Styles/Closet'
import { COLORS } from '../../../Constants/Color'
import { TopSVG, BottomSVG, Color } from '../../../Styles'
import { MakeClothPropsType } from '../../../Types'

const MakeCloth:FC<MakeClothPropsType> = props => {
  const {
    topFillColor,
    bottomFillColor,
    onChangeTopClothColor,
    onChangeBottomClothColor,
  } = props.items

  return (
    <Container>
      <ClosetColorSetting>
        <SvgContent>
          <TopSVG fill={topFillColor} />
        </SvgContent>
        <Palette>
          {COLORS.map((color:string) => (
            <Color
              key={color}
              color={color}
              onClick={() => onChangeTopClothColor(color)}
            />
          ))}
        </Palette>
      </ClosetColorSetting>
      <ClosetColorSetting>
        <SvgContent>
          <BottomSVG fill={bottomFillColor} />
        </SvgContent>
        <Palette>
          {COLORS.map((color:string) => (
            <Color
              key={color}
              color={color}
              onClick={() => onChangeBottomClothColor(color)}
            />
          ))}
        </Palette>
      </ClosetColorSetting>
    </Container>
  )
}
export default React.memo(MakeCloth)
