import React, { FC, useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import { AxiosResponse } from 'axios'
import { useDispatch } from 'react-redux'
import http from '../../Api/http-common'
import { ReactComponent as Top } from '../../Assets/top.svg'
import { ReactComponent as Bottom } from '../../Assets/bottom.svg'
import { CLOTHCOLORSET } from '../../Constants/Color'
import { setProductInfotList } from '../../Actions'

interface ModalPropsType {
  isOpen: boolean,
  closeModal: () => void
}
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: -1;
  opacity: 0;
  transition: all 0.5s;
`

const Window = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: #fff;
  box-shadow: 2px 4px 12px rgb(0 0 0 / 8%);
  padding: 1rem;
  border-radius: 1rem;
  width: 40rem;
  height: 37rem;
  transform: translate(-50%, -40%);
  transition: all 0.5s;
`
const Close = styled.span`
  position: fixed;
  top: 0.5rem;
  right: 1rem;
  font-size: 2rem;
  font-weight: bold;
  &:hover {
    cursor: pointer;
    color:black;
  }
`

const Cloth = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.5rem;
  &:hover {
    cursor: pointer;
    color:black;
  }
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
`

type ButtonPropsType = {
  width: string
}
const Button = styled.div<ButtonPropsType>`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${(props:ButtonPropsType) => props.width};
    height: 3rem;
    padding: 1rem;
    background: ${theme.colors.fifth} no-repeat 50%;
    border: 1px solid ${theme.colors.sixth};
    font-weight: bold;
    cursor: pointer;
  `}
`

const Modal:FC<ModalPropsType> = props => {
  const dispatch = useDispatch()
  const modalRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const contentRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const [chooseCloth, setChooseCloth] = useState<number>(-1)
  const { isOpen, closeModal } = props

  useEffect(() => {
    if (isOpen) {
      modalRef.current.style.zIndex = '1'
      modalRef.current.style.opacity = '1'
      contentRef.current.style.transform = 'translate(-50%, -50%)'
    } else {
      modalRef.current.style.zIndex = '-1'
      modalRef.current.style.opacity = '0'
      contentRef.current.style.transform = 'translate(-50%, -40%)'
    }
  }, [isOpen])

  const onCheckedCloth = async (i:number) => {
    // await setChooseCloth(i => i + 1)
    // await setChooseCloth(i => i + 1)
    // await setChooseCloth(i => i + 1)
    // setChooseCloth(chooseCloth + 1)
    // setChooseCloth(chooseCloth + 1)
    // setChooseCloth(chooseCloth + 1)
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
    <Overlay ref={modalRef}>
      <Window>
        <Content ref={contentRef}>
          {chooseCloth}
          <Close onClick={closeModal}>x</Close>
          <Closet>
            {CLOTHCOLORSET.map((set:string[], i:number) => (
              <Cloth key={set[0] + set[1] + i}>
                <Top
                // onClick={() => changeLightTheme()}
                // onMouseEnter={() => themeButtonHover(LIGHT)}
                // onMouseLeave={() => themeButtonLeave()}
                  fill={set[0]}
                  height='3rem'
                />
                <Bottom
                  // onClick={() => changeLightTheme()}
                  // onMouseEnter={() => themeButtonHover(LIGHT)}
                  // onMouseLeave={() => themeButtonLeave()}
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
            <Button width='10rem'>조합 추가하기</Button>
            <Button
              width='10rem'
              onClick={() => onSumbitCloth()}
            >
              선택한 조합 옷 보기
            </Button>
          </ButtonContainer>
        </Content>
      </Window>
    </Overlay>
  )
}

export default React.memo(Modal)
