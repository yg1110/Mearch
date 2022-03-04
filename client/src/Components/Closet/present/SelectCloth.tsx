import React, { FC } from 'react'
import { ReactComponent as Top } from '../../../Assets/top.svg'
import { ReactComponent as Bottom } from '../../../Assets/bottom.svg'
import {
  BottomBorder, Cloth, Container, RadioButton, TopBorder,
} from '../../../Styles/Closet'
import { ColorSetPropsType } from '../../../Types'

const SelectCloth:FC<ColorSetPropsType> = props => {
  const { colorSet, onCheckedCloth } = props

  return (
    <Container>
      {colorSet.map((set:string[], i:number) => (
        <Cloth key={set[0] + set[1] + i}>
          <TopBorder color={set[0]}>
            <Top
              fill={set[0]}
              height='3rem'
            />
          </TopBorder>
          <BottomBorder color={set[1]}>
            <Bottom
              fill={set[1]}
              height='4rem'
            />
          </BottomBorder>
          <RadioButton
            type='radio'
            name='cloth'
            onClick={() => onCheckedCloth(i)}
          />
        </Cloth>
      ))}
    </Container>
  )
}

export default React.memo(SelectCloth)
