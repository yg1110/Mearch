import React from 'react'
import { TITLE } from '../../../Constants/Menu'
import { Title } from '../../../Styles/Header'

const Logo = () => (
  <Title>{TITLE}</Title>
)
export default React.memo(Logo)
