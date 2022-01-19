import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AxiosResponse } from 'axios'
import http from '../../Api/http-common'
import ProductInfoList from '../present/ProductInfoList'
import { StateType } from '../../Types/index'
import { setProductInfotList } from '../../Middleware/Actions'

function ProductInfo() {
  const dispatch = useDispatch()
  const product = useSelector((state:StateType) => state.product)
  useEffect(() => {
    if (product.length === 0) {
      http
        .get('/')
        .then((res: AxiosResponse) => {
          const { data } = res
          dispatch(setProductInfotList(data))
        })
        .catch(e => {
          console.log(e)
        })
    }
  }, [product])

  return (
    <React.Fragment>
      <ProductInfoList items={product} />
    </React.Fragment>
  )
}

export default React.memo(ProductInfo)
