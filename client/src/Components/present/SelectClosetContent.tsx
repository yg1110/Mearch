import React, { useContext, useEffect, useState, FC } from 'react'
import { useDispatch } from 'react-redux'
import { DataContext } from '../container/Modal'
import { ReactComponent as Top } from '../../Assets/top.svg'
import { ReactComponent as Bottom } from '../../Assets/bottom.svg'
import RestService from '../../Api/http-common'
import { setProductInfotList } from '../../Middleware/Actions'
import { Button } from '../../Styles'
import {
  Close, SelectCloset, Closet,
  Cloth, RadioButton, ButtonContainer,
} from '../../Styles/Modal'
import { ColorSetPropsType, DataContextValues } from '../../Types'

export const SelectClosetContent:FC<ColorSetPropsType> = props => {
  const dispatch = useDispatch()
  const { makeContentRef, selectContentRef, closeModal } = useContext(DataContext) as DataContextValues
  const [chooseCloth, setChooseCloth] = useState<number>(-1)
  const { colorSet } = props

  const onAddCloth = () => {
    makeContentRef.current.style.zIndex = '2'
    makeContentRef.current.style.opacity = '1'
    makeContentRef.current.style.transform = 'translate(-50%, -50%)'
  }

  const onCheckedCloth = (i:number) => {
    setChooseCloth(i)
  }

  const onSubmitCloth = async () => {
    if (chooseCloth === -1) return false
    const clothSet = colorSet[chooseCloth]
    const { data, message } = await RestService.getClothset(clothSet[0], clothSet[1])

    if (message === 'success') {
      closeModal()
      dispatch(setProductInfotList(data))
    } else {
      // error
      console.log(message)
    }

    return true
  }

  return (
    <SelectCloset
      ref={selectContentRef}
    >
      <Close onClick={closeModal}>x</Close>
      <Closet>
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
      </Closet>
      <ButtonContainer>
        <Button
          width='10rem'
          onClick={onAddCloth}
        >
          조합 추가하기
        </Button>
        <Button
          width='10rem'
          onClick={() => onSubmitCloth()}
        >
          선택한 조합 옷 보기
        </Button>
      </ButtonContainer>
    </SelectCloset>
  )
}
