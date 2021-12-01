import { createAction } from '@reduxjs/toolkit';
import { REQUEST, ORDER_ACTION } from '../constants';

export const orderProductAction = createAction(REQUEST(ORDER_ACTION.ORDER_PRODUCT));
export const getOrderHistoryAction = createAction(REQUEST(ORDER_ACTION.GET_ORDER_HISTORY));
