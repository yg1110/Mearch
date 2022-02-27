import React from 'react'
import ClosetContent from '../Components/Closet/SelectCloset'
import { Container } from '../Styles'

function SelectCloset() {
  return (
    <Container>
      <ClosetContent />
    </Container>
  )
}

export default React.memo(SelectCloset)
