import React, { useEffect } from 'react'
import { AxiosResponse } from 'axios'
import http from '../Api/http-common'

function Product() {
  useEffect(() => {
    console.log(process.env)
    http
      .get('/')
      .then((res: AxiosResponse) => {
        console.log(res)
      })
      .catch(e => {
        console.log(e)
      })
  }, [])

  return <div className='App'>App</div>
}

export default Product
