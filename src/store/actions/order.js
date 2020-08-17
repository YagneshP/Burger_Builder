import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		orderId: id,
		orderData: orderData
	};
};

export const purchaseBurgerFail = (error) => {
	return {
		type: actionTypes.PURCHASE_BURGER_FAIL,
		error: error
	};
};

export const purchaseBurgerStart = () => {
	return {
		type: actionTypes.PURCHASE_BURGER_START
	};
};

export const puchaseBurger = (orderData, token) => {
	return (dispatch) => {
		dispatch(purchaseBurgerStart());
		axios
			.post('/orders.json?auth=' + token, orderData) // endpoint with (.json ) for firebase only
			.then((response) => {
				dispatch(purchaseBurgerSuccess(response.data.name, orderData));
			})
			.catch((error) => dispatch(purchaseBurgerFail(error)));
	};
};

export const purchaseInit = () => {
	return {
		type: actionTypes.PURCHASE_INIT
	};
};

export const fetchOrderSuccess = (order) => ({
	type: actionTypes.FETCH_ORDER_SUCCESS,
	order: order
});

export const fetchOrderFail = (error) => ({
	type: actionTypes.FETCH_ORDER_FAIL,
	error: error
});

export const fetchOrderStart = () => ({
	type: actionTypes.FETCH_ORDER_START
});

export const fetchOrder = (token, userId) => {
	return (dispatch) => {
		dispatch(fetchOrderStart());
		const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
		axios
			.get('/orders.json' + queryParams)
			.then((res) => {
				let fetchedOrders = [];
				for (let key in res.data) {
					fetchedOrders.push({
						...res.data[key],
						id: key
					});
				}
				dispatch(fetchOrderSuccess(fetchedOrders));
			})
			.catch((err) => dispatch(fetchOrderFail(err)));
	};
};
