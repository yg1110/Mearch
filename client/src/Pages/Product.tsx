import React from 'react'
import ProductList from '../Components/Product'
import { Container } from '../Styles'

function Product() {
  return (
    <Container>
      <ProductList />
    </Container>
  )
}

export default React.memo(Product)
