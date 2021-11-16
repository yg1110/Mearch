import { ADD, ProductListAction } from '../Actions'
import { ProductInfoListType } from '../Types/productInfoType'

type Actions = ProductListAction;
export type productState = {
    product: ProductInfoListType,
};

const initstate:productState = { product: [] }

export const productReducer = (
  state = initstate,
  action: Actions,
) => {
  switch (action.type) {
    case ADD:
      return { ...state, product: state.product.concat(action.payload) }
    default:
      return state
  }
}
