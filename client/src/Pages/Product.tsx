import React from 'react'
import ProductList from '../Components/Product'
import { Container, PageTitle } from '../Styles'

function Product() {
  return (
    <Container>
      <PageTitle>목록보기</PageTitle>
      <ProductList />
    </Container>
  )
}

export default React.memo(Product)
