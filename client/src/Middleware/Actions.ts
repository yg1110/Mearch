import { ProductInfoListType } from '../Types'

export const PPRODUCT_INFO_ADD = 'product/ADD'
export const SET_THEME = 'theme/SET'

export const setProductInfotList = (productInfo: ProductInfoListType) => ({
  type: PPRODUCT_INFO_ADD,
  payload: productInfo,
})

export const setTheme = (theme: string) => ({
  type: SET_THEME,
  payload: theme,
})

export type ActionType =
  ReturnType<typeof setProductInfotList> |
  ReturnType<typeof setTheme>
