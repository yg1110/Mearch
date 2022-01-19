import React, { FC, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { SelectClosetContent } from '../present/SelectClosetContent'
import { MakeClosetContent } from '../present/MakeClosetContent'

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

export type DataContextValues = {
  makeContentRef: React.MutableRefObject<HTMLDivElement>
  selectContentRef: React.MutableRefObject<HTMLDivElement>
  closeModal: () => void
  closeMakeModal : () => void
};
export const DataContext = React.createContext<DataContextValues>(null!)

const Modal:FC<ModalPropsType> = props => {
  const modalRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const makeContentRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const selectContentRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const { isOpen, closeModal } = props

  useEffect(() => {
    if (isOpen) {
      modalRef.current.style.zIndex = '1'
      modalRef.current.style.opacity = '1'
      selectContentRef.current.style.transform = 'translate(-50%, -50%)'
    } else {
      modalRef.current.style.zIndex = '-1'
      modalRef.current.style.opacity = '0'
      selectContentRef.current.style.transform = 'translate(-50%, -40%)'
    }
  }, [isOpen])

  const closeMakeModal = () => {
    makeContentRef.current.style.zIndex = '-1'
    makeContentRef.current.style.opacity = '0'
    makeContentRef.current.style.transform = 'translate(-50%, -40%)'
  }

  const onWindowClick = (e:React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return
    closeMakeModal()
    closeModal()
  }

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
          <SelectClosetContent />
          <MakeClosetContent />
        </Window>
      </Overlay>
    </DataContext.Provider>
  )
}

export default React.memo(Modal)
