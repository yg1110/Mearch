import React from 'react'
import ClosetContent from '../Components/Closet/SelectCloset'
import { Container, PageTitle } from '../Styles'

function SelectCloset() {
  return (
    <Container>
      <PageTitle>조합 선택하기</PageTitle>
      <ClosetContent />
    </Container>
  )
}

export default React.memo(SelectCloset)
