import React from 'react'
import ProductInfo from '../Components/container/ProductInfo'
import Header from '../Components/container/Header'

function Product() {
  return (
    <React.Fragment>
      <Header />
      <ProductInfo />
    </React.Fragment>
  )
}

export default React.memo(Product)
