import { ProductListType } from '../Types'

export const PPRODUCT_LIST = 'product/LIST'
export const SET_THEME = 'theme/SET'
export const SET_LOADER = 'loader/SET'

export const setProductInfotList = (productInfo: ProductListType) => ({
  type: PPRODUCT_LIST,
  payload: productInfo,
})

export const setTheme = (theme: string) => ({
  type: SET_THEME,
  payload: theme,
})

export const setLoader = (isLoad: boolean) => ({
  type: SET_LOADER,
  payload: isLoad,
})

export type ActionType =
  ReturnType<typeof setProductInfotList> |
  ReturnType<typeof setTheme> |
  ReturnType<typeof setLoader>
