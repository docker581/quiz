import axios from  'axios';
import {
    AUTH_SUCCESS,
    AUTH_LOGOUT,
    AUTH_ERROR,
} from "./actionTypes";

export function auth(email, password) {
    return async (dispatch) => {
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
        };
        try {
            let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAyK6JOXdQSvmw2NgK1oJ7i_m2sbUFHD8M';
            const response = await axios.post(url, authData);
            //console.log('POST', response.data);
            const data = response.data;
            const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000); //правильная дата (время через час)
            localStorage.setItem('token', data.idToken);
            localStorage.setItem('userId', data.localId);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(data.idToken));
            dispatch(autoLogout(data.expiresIn));
        } catch (e) {
            dispatch(authError(e));
        }
    }
}
export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token: token,
    }
}
export function autoLogout(time) { //автоматическое разлогинирование через час
    return (dispatch) => {
        setTimeout(() => {
            dispatch(logout())
        }, time * 1000)
    }
}
export function authError(error) { //неудачный вход в систему
    console.log('AUTH_ERROR', error);
    return {
        type: AUTH_ERROR,
    }
}
export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    return {
        type: AUTH_LOGOUT,
    }
}
export function autoLogin() {
    return (dispatch) => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) { //если дата окончания срока меньше текущей даты
                dispatch(logout());
            } else {
                dispatch(authSuccess(token));
                dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}

