import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './modalSlce';

export default configureStore({
  reducer: {
    modal: modalReducer,
  },
});
