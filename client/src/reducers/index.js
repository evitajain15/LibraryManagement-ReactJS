import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import booksReducer from './booksReducer';

export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    books: booksReducer
});