import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductInfoList from '../present/ProductInfoList'
import { StateType } from '../../Types/index'
import RestService from '../../Api/http-common'
import { setProductInfotList } from '../../Middleware/Actions'

function ProductInfo() {
  const dispatch = useDispatch()
  const product = useSelector((state:StateType) => state.product)

  const getProductInfoList = async () => {
    const { data, message } = await RestService.getProductInfoList()

    if (message === 'success') {
      dispatch(setProductInfotList(data))
    } else {
      // error
      console.log(message)
    }
  }

  useEffect(() => {
    getProductInfoList()
  }, [])

  return (
    <React.Fragment>
      <ProductInfoList items={product} />
    </React.Fragment>
  )
}

export default React.memo(ProductInfo)
