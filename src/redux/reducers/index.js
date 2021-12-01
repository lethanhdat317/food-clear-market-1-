
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from "redux-saga";

import productReducer from './product.reducer';
import userReducer from './user.reducer';
import categoryReducer from './category.reducer';
import cartReducer from './cart.reducer';
import commonReducer from './common.reducer';
import orderReducer from './order.reducer';

import rootSaga from '../sagas';

let sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    productReducer: productReducer,
    userReducer: userReducer,
    categoryReducer: categoryReducer,
    cartReducer: cartReducer,
    commonReducer: commonReducer,
    orderReducer: orderReducer,
  },
  middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
