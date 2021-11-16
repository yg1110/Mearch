import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AxiosResponse } from 'axios'
import http from '../../Api/http-common'
import ProductInfoList from '../present/ProductInfoList'
import { setProducInfotList } from '../../Actions'

function ProductInfo() {
  const dispatch = useDispatch()

  useEffect(() => {
    http
      .get('/')
      .then((res: AxiosResponse) => {
        const { data } = res
        dispatch(setProducInfotList(data))
      })
      .catch(e => {
        console.log(e)
      })
  }, [])

  return (<ProductInfoList />)
}

export default ProductInfo
