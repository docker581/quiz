import {
    AUTH_SUCCESS,
    AUTH_LOGOUT,
    AUTH_ERROR,
} from '../actions/actionTypes'
const initialState = {
    token: null, //токен для авторизации пользователя
    noEnter: false, //проверка выполнения входа
};
export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {
                ...state, token: action.token,
            };
        case AUTH_LOGOUT:
            return {
                ...state, token: null,
            };
        case AUTH_ERROR:
            return {
                ...state, noEnter: true,
            };
        default:
            return state;
    }
}