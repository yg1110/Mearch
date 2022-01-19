import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { ColorPoropsType } from '../../Types'
import { DataContext, DataContextValues } from '../container/Modal'
import { CLOTHCOLORSET, COLORS1, COLORS2 } from '../../Constants/Color'
import { ReactComponent as Top } from '../../Assets/top.svg'
import { ReactComponent as Bottom } from '../../Assets/bottom.svg'
import { Button, Close, SelectCloset } from '../../Styles/Header'

const MakeCloset = styled(SelectCloset)`
width: 30rem;
height: 25rem;
opacity: 0;
z-index: -1;
`
const ClosetColorSetting = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 42%;
width: 100%;
`

// 추후 통일
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
    display:flex;
    flex-direction: column;
  `

const ColorSetting = styled.div`
    display: flex;
  `

const ButtonCenterContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `

export const MakeClosetContent = () => {
  const { closeMakeModal, makeContentRef } = useContext(DataContext) as DataContextValues
  const [topFillColor, setTopFillColor] = useState<string>('#000000')
  const [bottomFillColor, setBottomFillColor] = useState<string>('#000000')

  const onChangeTopClothColor = (color:string) => {
    setTopFillColor(color)
  }

  const onChangeBottomClothColor = (color:string) => {
    setBottomFillColor(color)
  }

  const onSubmitCloset = () => {
    CLOTHCOLORSET.push([topFillColor, bottomFillColor])
    closeMakeModal()
  }

  return (
    <MakeCloset
      ref={makeContentRef}
      name='make'
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
