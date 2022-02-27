import React, { FC } from 'react'
import { Routes, Route } from 'react-router-dom'

const Routers: FC = () => {
  const Product = React.lazy(() => import('../Pages/Product'))
  const MakeCloset = React.lazy(() => import('../Pages/MakeCloset'))
  const SelectCloset = React.lazy(() => import('../Pages/SelectCloset'))
  const UpdateProduct = React.lazy(() => import('../Pages/UpdateProduct'))
  const ErrorPage = React.lazy(() => import('../Pages/ErrorPage'))
  return (
    <Routes>
      <Route
        path='/'
        element={<Product />}
      />
      <Route
        path='/makecloset'
        element={<MakeCloset />}
      />
      <Route
        path='/selectcloset'
        element={<SelectCloset />}
      />
      <Route
        path='/updateproduct'
        element={<UpdateProduct />}
      />
      <Route
        path='*'
        element={<ErrorPage />}
      />
    </Routes>

  )
}
export default Routers
