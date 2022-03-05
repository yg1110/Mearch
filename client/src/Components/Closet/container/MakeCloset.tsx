import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ClosetContent, ButtonContainer, Button } from '../../../Styles/Closet'
import MakeCloth from '../present/MakeCloth'
import RestService from '../../../Api/http-common'

function MakeCloset() {
  const navigate = useNavigate()
  const [topFillColor, setTopFillColor] = useState<string>('')
  const [bottomFillColor, setBottomFillColor] = useState<string>('')

  const onChangeTopClothColor = (color:string) => {
    setTopFillColor(color)
  }

  const onChangeBottomClothColor = (color:string) => {
    setBottomFillColor(color)
  }

  const setClothset = async (top:string, bottom:string) => {
    // TODO 서버 예외처리 작업끝나면 추가되지 않았을때 작업 추가(현재는 무조건 성공)
    await RestService.setClothset(top, bottom)
    navigate('/selectcloset')
  }

  const onSubmitCloset = () => {
    setClothset(topFillColor, bottomFillColor)
  }

  const items = {
    topFillColor,
    bottomFillColor,
    onChangeTopClothColor,
    onChangeBottomClothColor,
  }

  return (
    <React.Fragment>
      <ClosetContent>
        <MakeCloth items={items} />
      </ClosetContent>
      <ButtonContainer>
        <Button onClick={onSubmitCloset}>선택한 조합 추가</Button>
      </ButtonContainer>
    </React.Fragment>
  )
}

export default React.memo(MakeCloset)
