import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ClosetContent, ButtonContainer, Button } from '../../../Styles/Closet'
import RestService from '../../../Api/http-common'
import SelectCloth from '../present/SelectCloth'
import { ColorSetType } from '../../../Types'
import { setProductInfotList } from '../../../Middleware/Actions'

function SelectCloset() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [colorSet, setClorSet] = useState<ColorSetType>([])
  const [chooseCloth, setChooseCloth] = useState<number>(-1)

  const getColorset = async () => {
    const { data, message } = await RestService.getColorset()

    if (message === 'success') {
      setClorSet(data)
    } else {
      // error
      console.log(message)
    }
  }

  const onCheckedCloth = (i:number) => {
    setChooseCloth(i)
  }

  const onSubmitCloth = async () => {
    if (chooseCloth === -1) return false
    const clothSet = colorSet[chooseCloth]
    const { data, message } = await RestService.getClothset(clothSet[0], clothSet[1])

    if (message === 'success') {
      dispatch(setProductInfotList(data))
      navigate('/', { state: 'select' })
    } else {
      console.log(message)
    }

    return true
  }

  useEffect(() => {
    getColorset()
  }, [])

  return (
    <React.Fragment>
      <ClosetContent>
        <SelectCloth
          colorSet={colorSet}
          onCheckedCloth={onCheckedCloth}
        />
      </ClosetContent>
      <ButtonContainer>
        <Button onClick={onSubmitCloth}>선택한 조합 옷 보기</Button>
      </ButtonContainer>
    </React.Fragment>
  )
}

export default React.memo(SelectCloset)
