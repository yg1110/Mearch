import { ProductListType } from '../Types'

export const PPRODUCT_LIST = 'product/LIST'
export const SET_THEME = 'theme/SET'

export const setProductInfotList = (productInfo: ProductListType) => ({
  type: PPRODUCT_LIST,
  payload: productInfo,
})

export const setTheme = (theme: string) => ({
  type: SET_THEME,
  payload: theme,
})

export type ActionType =
  ReturnType<typeof setProductInfotList> |
  ReturnType<typeof setTheme>
