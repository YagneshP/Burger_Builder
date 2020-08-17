import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => ({
	type: actionTypes.AUTH_START
});

export const authSuccess = (token, userId) => ({
	type: actionTypes.AUTH_SUCCESS,
	tokenId: token,
	userId: userId
});

export const authFail = (error) => ({
	type: actionTypes.AUTH_FAIL,
	error: error
});

export const logOut = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('expirationDate');
	localStorage.removeItem('userId');
	return {
		type: actionTypes.AUTH_LOGOUT
	};
};

export const checkAuthTime = (expireTime) => {
	return (dispatch) => {
		setTimeout(() => {
			dispatch(logOut());
		}, expireTime * 1000);
	};
};

export const auth = (email, password, isSignUp) => {
	return (dispatch) => {
		dispatch(authStart());
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true
		};
		let url =
			'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCbpKlRKrtws4c9vVio0hYVWfD3LaWyOYc';
		if (!isSignUp) {
			url =
				'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCbpKlRKrtws4c9vVio0hYVWfD3LaWyOYc';
		}
		axios
			.post(url, authData)
			.then((response) => {
				const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
				localStorage.setItem('expirationDate', expirationDate);
				localStorage.setItem('token', response.data.idToken);
				localStorage.setItem('userId', response.data.localId);
				dispatch(authSuccess(response.data.idToken, response.data.localId));
				dispatch(checkAuthTime(response.data.expiresIn));
			})
			.catch((err) => {
				dispatch(authFail(err.response.data.error));
			});
	};
};

export const setRedirectPath = (path) => {
	return {
		type: actionTypes.SET_REDIRECT_PATH,
		path: path
	};
};

export const authCheckState = () => {
	return (dispatch) => {
		const token = localStorage.getItem('token');

		if (!token) {
			dispatch(logOut());
		} else {
			const expirationDate = new Date(localStorage.getItem('expirationDate'));
			if (expirationDate > new Date()) {
				const userId = localStorage.getItem('userId');
				dispatch(authSuccess(token, userId));
				dispatch(checkAuthTime((expirationDate.getTime() - new Date().getTime()) / 1000));
			} else {
				dispatch(logOut());
			}
		}
	};
};
