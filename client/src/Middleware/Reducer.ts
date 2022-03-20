import {
  PPRODUCT_LIST, SET_THEME, SET_LOADER, ActionType, setProductInfotList, setTheme, setLoader,
} from './Actions'
import { getStorage } from '../Utils/storage'
import { StateType } from '../Types'

const initstate:StateType = { product: [], theme: getStorage('Theme'), isLoad: false }

export const productReducer = (
  state = initstate,
  action: ActionType,
) => {
  switch (action.type) {
    case PPRODUCT_LIST: {
      const productAction = action as ReturnType<typeof setProductInfotList>
      return { ...state, product: productAction.payload }
    }
    case SET_THEME: {
      const themeAction = action as ReturnType<typeof setTheme>
      return { ...state, theme: themeAction.payload }
    }
    case SET_LOADER: {
      const loaderAction = action as ReturnType<typeof setLoader>
      return { ...state, isLoad: loaderAction.payload }
    }
    default:
      return state
  }
}
