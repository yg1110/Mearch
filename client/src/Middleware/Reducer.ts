import {
  PPRODUCT_LIST, SET_THEME, ActionType, setProductInfotList, setTheme,
} from './Actions'
import { getStorage } from '../Utils/storage'
import { StateType } from '../Types'

const initstate:StateType = { product: [], theme: getStorage('Theme') }

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
    default:
      return state
  }
}
