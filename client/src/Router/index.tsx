import React, { FC } from 'react'
import { Routes, Route } from 'react-router-dom'

const Routers: FC = () => {
  const Product = React.lazy(() => import('../Pages/Product'))
  return (
    <Routes>
      <Route
        path='/'
        element={<Product />}
      />
    </Routes>

  )
}
export default Routers
