import React, { FC, useEffect, useRef, useState } from 'react'
import { SelectClosetContent } from '../present/SelectClosetContent'
import { MakeClosetContent } from '../present/MakeClosetContent'
import { ColorSetType, DataContextValues, ModalPropsType } from '../../Types'
import { Overlay, Window } from '../../Styles/Modal'
import RestService from '../../Api/http-common'

export const DataContext = React.createContext<DataContextValues | null>(null)
const Modal:FC<ModalPropsType> = props => {
  const modalRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const makeContentRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const selectContentRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const { isOpen, closeModal } = props
  const [colorSet, setClorSet] = useState<ColorSetType>([])

  const closeMakeModal = () => {
    makeContentRef.current.style.zIndex = '-1'
    makeContentRef.current.style.opacity = '0'
    makeContentRef.current.style.transform = 'translate(-50%, -40%)'
  }

  const onWindowClick = (e:React.MouseEvent<HTMLDivElement>) => {
    // 이벤트 버블링 방지
    if (e.target !== e.currentTarget) return
    closeMakeModal()
    closeModal()
  }

  const setModalvisibility = () => {
    if (isOpen) {
      modalRef.current.style.zIndex = '1'
      modalRef.current.style.opacity = '1'
      selectContentRef.current.style.transform = 'translate(-50%, -50%)'
    } else {
      modalRef.current.style.zIndex = '-1'
      modalRef.current.style.opacity = '0'
      selectContentRef.current.style.transform = 'translate(-50%, -40%)'
    }
  }

  const getColorset = async () => {
    const { data, message } = await RestService.getColorset()

    if (message === 'success') {
      setClorSet(data)
    } else {
      // error
      console.log(message)
    }
  }

  useEffect(() => {
    setModalvisibility()
  }, [isOpen])

  useEffect(() => {
    getColorset()
  }, [])

  const dataContextValues = {
    makeContentRef,
    selectContentRef,
    closeModal,
    closeMakeModal,
  }

  return (
    <DataContext.Provider value={dataContextValues}>
      <Overlay
        ref={modalRef}
      >
        <Window onClick={onWindowClick}>
          <SelectClosetContent colorSet={colorSet} />
          <MakeClosetContent colorSet={colorSet} />
        </Window>
      </Overlay>
    </DataContext.Provider>
  )
}

export default React.memo(Modal)
