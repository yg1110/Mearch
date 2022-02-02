import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { TITLE } from '../../../Constants/Menu'
import { Title } from '../../../Styles/Header'

interface LogoPropsType {
  closeContent: () => void
}

const Logo:FC<LogoPropsType> = (props:LogoPropsType) => {
  const { closeContent } = props
  const navigate = useNavigate()
  const onRootPage = () => {
    navigate('/', { state: 'root' })
    closeContent()
  }
  return (
    <Title onClick={onRootPage}>{TITLE}</Title>
  )
}
export default React.memo(Logo)
