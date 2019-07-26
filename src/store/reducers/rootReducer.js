import {combineReducers} from 'redux';
import authReducer from './authReducer';
import quizReducer from './quizReducer';
import createReducer from './createReducer';

export default combineReducers({
    auth: authReducer,
    quiz: quizReducer,
    create: createReducer,
})