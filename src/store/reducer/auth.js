import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../utility';
const intialState = {
	token: null,
	userId: null,
	error: null,
	loading: false,
	authRedirectPath: '/'
};

//functions for lean switch case

const authStart = (state, action) => updatedObject(state, { error: null, loading: true });
const authSuccess = (state, action) =>
	updatedObject(state, {
		token: action.tokenId,
		userId: action.userId,
		error: null,
		loading: false
	});
const authFail = (state, action) =>
	updatedObject(state, {
		error: action.error,
		loading: false
	});
const authLogout = (state, action) => updatedObject(state, { token: null, userId: null });
const setAuthRedirectPath = (state, action) => updatedObject(state, { authRedirectPath: action.path });

const reducer = (state = intialState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_START:
			return authStart(state, action);
		case actionTypes.AUTH_SUCCESS:
			return authSuccess(state, action);
		case actionTypes.AUTH_FAIL:
			return authFail(state, action);
		case actionTypes.AUTH_LOGOUT:
			return authLogout(state, action);
		case actionTypes.SET_REDIRECT_PATH:
			return setAuthRedirectPath(state, action);
		default:
			return state;
	}
};

export default reducer;
