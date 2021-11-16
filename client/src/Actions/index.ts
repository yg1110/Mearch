import { ProductInfo } from '../Types/productInfoType'

export const ADD = 'product/ADD'

export const setProducInfotList = (productInfo: ProductInfo) => ({
  type: ADD,
  payload: productInfo,
})

export type ProductListAction =
  ReturnType<typeof setProducInfotList>
