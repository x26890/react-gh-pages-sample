import { createContext } from "react";

function calculateTotalPrice(cartList) {
  return cartList.map((item) => item.quantity * item.price)
    .reduce((a, b) => a + b, 0);
}


export const cartInit = {
  cartList: [],
}

export const cartReducer = (state, action) => {
  const cartList = [...state.cartList];

  const index = cartList.findIndex((item) => item.id === action.payload.id);
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { payload } = action;
      if (index === -1) {
        cartList.push({
          ...payload,
          quantity: payload.quantity || 1 // 保留傳入值，添加預設值防錯
        });
      } else {
        cartList[index].quantity += payload.quantity || 1; // 累加傳入值
      }
      return {
        ...state,
        cartList,
        total: calculateTotalPrice(cartList)
      };
    }

    case 'CHANGE_CART_QUANTITY':
      // ▼▼▼ 新增防錯檢查 ▼▼▼
      if (index === -1) {
        console.error('Item not found in cart:', action.payload.id);
        return state; // 直接返回原狀態
      }

      cartList[index].quantity = action.payload.quantity;
      return {
        ...state,
        cartList,
        total: calculateTotalPrice(cartList)
      };

    case 'REMOVE_CART_ITEM':
      cartList.splice(index, 1);
      return {
        ...state,
        cartList,
        total: calculateTotalPrice(cartList),
      };
    default:
      return state
  }
}
export const CartContext = createContext({});