import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { AxiosResponse } from 'axios'
import { useDispatch } from 'react-redux'
import { DataContext, DataContextValues } from '../container/Modal'
import { CLOTHCOLORSET } from '../../Constants/Color'
import { ReactComponent as Top } from '../../Assets/top.svg'
import { ReactComponent as Bottom } from '../../Assets/bottom.svg'

import http from '../../Api/http-common'
import { setProductInfotList } from '../../Middleware/Actions'
import { Button, Close, SelectCloset } from '../../Styles/Header'

const Cloth = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0.5rem;
  `

const Closet = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    height: 30rem;
    overflow-y: auto;
    flex-wrap : wrap;
  `

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0.5rem 1.5rem;
  `

const RadioButton = styled.input`
    margin:0.5rem;
    &:hover {
      cursor: pointer;
      color:black;
    }
  `

export const SelectClosetContent = () => {
  const dispatch = useDispatch()
  const { makeContentRef, selectContentRef, closeModal } = useContext(DataContext) as DataContextValues
  const [chooseCloth, setChooseCloth] = useState<number>(-1)

  const onAddCloth = () => {
    makeContentRef.current.style.zIndex = '2'
    makeContentRef.current.style.opacity = '1'
    makeContentRef.current.style.transform = 'translate(-50%, -50%)'
  }

  const onCheckedCloth = (i:number) => {
    setChooseCloth(i)
  }

  const onSumbitCloth = () => {
    if (chooseCloth === -1) return false
    const clothSet = CLOTHCOLORSET[chooseCloth]
    http
      .post('/clothset', { Top: clothSet[0], Bottom: clothSet[1] })
      .then((res: AxiosResponse) => {
        const { data } = res
        if (data.length > 0) {
          closeModal()
          dispatch(setProductInfotList(data))
        }
      })
      .catch(e => {
        console.log(e)
      })

    return true
  }

  return (
    <SelectCloset
      ref={selectContentRef}
      name='select'
    >
      <Close onClick={closeModal}>x</Close>
      <Closet>
        {CLOTHCOLORSET.map((set:string[], i:number) => (
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
          onClick={() => onSumbitCloth()}
        >
          선택한 조합 옷 보기
        </Button>
      </ButtonContainer>
    </SelectCloset>
  )
}
