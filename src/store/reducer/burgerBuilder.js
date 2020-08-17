import * as actionTypes from '../actions/actionTypes';

const INGREDIENT_PRICE = {
	salad: 0.6,
	bacon: 1.4,
	cheese: 1,
	meat: 0.8
};

const intialState = {
	ingredients: null,
	totalPrice: 4,
	error: false,
	building: false
};

const reducer = (state = intialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName] + 1
				},
				totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
				building: true
			};
		case actionTypes.REMOVE_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName] - 1
				},
				totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName],
				building: true
			};

		case actionTypes.SET_INGREDIENTS:
			return {
				...state,
				ingredients: {
					salad: action.ingredients.salad,
					cheese: action.ingredients.cheese,
					meat: action.ingredients.meat,
					bacon: action.ingredients.bacon
				},
				totalPrice: 4,
				error: false,
				building: false
			};
		case actionTypes.FETCH_INGREDIENTS_FAILED:
			return {
				...state,
				error: true
			};
		default:
			return state;
	}
};

export default reducer;
