import { ProductInfoListType } from '../Types'

export const PPRODUCT_INFO_ADD = 'product/ADD'
export const THEME_ADD = 'theme/ADD'

export const setProductInfotList = (productInfo: ProductInfoListType) => ({
  type: PPRODUCT_INFO_ADD,
  payload: productInfo,
})

export const setTheme = (theme: string) => ({
  type: THEME_ADD,
  payload: theme,
})

export type ActionType =
  ReturnType<typeof setProductInfotList> |
  ReturnType<typeof setTheme>
