import React, { FC } from 'react'
import { ReactComponent as Top } from '../../../Assets/top.svg'
import { ReactComponent as Bottom } from '../../../Assets/bottom.svg'
import { Cloth, Container, RadioButton } from '../../../Styles/Closet'
import { ColorSetPropsType } from '../../../Types'

const SelectCloth:FC<ColorSetPropsType> = props => {
  const { colorSet, onCheckedCloth } = props

  return (
    <Container>
      {colorSet.map((set:string[], i:number) => (
        <Cloth key={set[0] + set[1] + i}>
          <Top
            fill={set[0]}
            height='3rem'
          />
          <Bottom
            fill={set[1]}
            height='4rem'
          />
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
