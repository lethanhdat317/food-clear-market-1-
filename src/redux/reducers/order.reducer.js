import { createReducer } from "@reduxjs/toolkit";
import {
  REQUEST,
  SUCCESS,
  FAILURE,
  ORDER_ACTION,
  USER_ACTION,
} from "../constants";

const initialState = {
  // orderProduct: {
  //   data: [],
  //   load: false,
  //   error: null,
  // },
  orderHistory: {
    data: [],
    load: false,
    error: null,
  },
}

const orderReducer = createReducer(initialState, {
  [REQUEST(ORDER_ACTION.GET_ORDER_HISTORY)]: (state, action) => {
    return {
      ...state,
      orderHistory: {
        ...state.orderHistory,
        load: true,
      },
    };
  },
  [SUCCESS(ORDER_ACTION.GET_ORDER_HISTORY)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      orderHistory: {
        ...state.orderHistory,
        data,
        load: false,
        error: null,
      },
    }
  },
  [FAILURE(ORDER_ACTION.GET_ORDER_HISTORY)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      orderHistory: {
        ...state.orderHistory,
        load: false,
        error,
      },
    }
  },
});

export default orderReducer;
