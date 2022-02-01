import React from 'react'
import ClosetContent from '../Components/Closet/MakeCloset'
import { Container, PageTitle } from '../Styles'

function MakeCloset() {
  return (
    <Container>
      <PageTitle>조합 추가하기</PageTitle>
      <ClosetContent />
    </Container>
  )
}

export default React.memo(MakeCloset)
