import { fork } from 'redux-saga/effects';

import productSaga from './product.saga';
import userSaga from './user.saga';
import categorySaga from './category.saga';
import cartSaga from './cart.saga';
import orderSaga from './order.saga';

export default function* rootSaga() {
  yield fork(productSaga);
  yield fork(userSaga);
  yield fork(categorySaga);
  yield fork(cartSaga);
  yield fork(orderSaga);
}