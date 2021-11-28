import { getStorage } from '../Utils/storage'
import {
  PPRODUCT_INFO_ADD, THEME_ADD, ActionType, setProductInfotList, setTheme,
} from '../Actions'
import { ProductInfoListType } from '../Types'

type Actions = ActionType;
export type StateType = {
    product: ProductInfoListType,
    theme: string
};

const initstate:StateType = { product: [], theme: getStorage('Theme') }

export const productReducer = (
  state = initstate,
  action: Actions,
) => {
  switch (action.type) {
    case PPRODUCT_INFO_ADD: {
      const productAction = action as ReturnType<typeof setProductInfotList>
      return { ...state, product: state.product.concat(productAction.payload) }
    }
    case THEME_ADD: {
      const themeAction = action as ReturnType<typeof setTheme>
      return { ...state, theme: themeAction.payload }
    }
    default:
      return state
  }
}
