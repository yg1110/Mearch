import React from 'react'
import ClosetContent from '../Components/Closet/container/MakeCloset'
import { Container } from '../Styles'

function MakeCloset() {
  return (
    <Container>
      <ClosetContent />
    </Container>
  )
}

export default React.memo(MakeCloset)
