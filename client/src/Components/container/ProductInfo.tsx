import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AxiosResponse } from 'axios'
import http from '../../Api/http-common'
import ProductInfoList from '../present/ProductInfoList'
import { setProductInfotList } from '../../Actions'

function ProductInfo() {
  const dispatch = useDispatch()

  useEffect(() => {
    http
      .get('/')
      .then((res: AxiosResponse) => {
        const { data } = res
        dispatch(setProductInfotList(data))
      })
      .catch(e => {
        console.log(e)
      })
  }, [])

  return (<ProductInfoList />)
}

export default React.memo(ProductInfo)
