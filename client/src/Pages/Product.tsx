import React from 'react'
import ProductList from '../Components/Product/container/Product'
import { Container } from '../Styles'

function Product() {
  return (
    <Container>
      <ProductList />
    </Container>
  )
}

export default React.memo(Product)
