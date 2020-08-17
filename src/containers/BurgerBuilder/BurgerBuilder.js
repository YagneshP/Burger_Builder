import React, { Fragment, useState, useEffect } from 'react';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
const BurgerBuilder = (props) => {
	const [ purchasing, setPurchasing ] = useState(false);
	const { onInitIngredients } = props;
	useEffect(
		() => {
			onInitIngredients();
		},
		[ onInitIngredients ]
	);

	const updatePurchase = (ingredients) => {
		const sum = Object.keys(ingredients)
			.map((igKey) => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		return sum > 0;
	};

	const purchaseHandler = () => {
		if (props.isAuthenticated) {
			setPurchasing(true);
		} else {
			props.onSetAuthRedirectPath('/checkout');
			props.history.push('/auth');
		}
	};

	const purchaseCancel = () => {
		setPurchasing(false);
	};

	const purchaseContinue = () => {
		props.onPurchaseInit();
		props.history.push('/checkout');
		// const queryParams = [];
		// for (let i in this.state.ingredients) {
		// 	queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
		// }
		// queryParams.push('price=' + this.state.totalPrice);
		// const queryString = queryParams.join('&');

		// this.props.history.push({
		// 	pathname: '/checkout',
		// 	search: '?' + queryString
		// });
	};
	// addIngredientHandle = (type) => {
	// 	const oldCount = this.state.ingredients[type];
	// 	const updatedCount = oldCount + 1;
	// 	const updatedIngredients = {
	// 		...this.state.ingredients
	// 	};
	// 	updatedIngredients[type] = updatedCount;
	// 	const priceAddition = INGREDIENT_PRICE[type];
	// 	const oldPrice = this.state.totalPrice;
	// 	const updatedPrice = oldPrice + priceAddition;

	// 	this.setState({
	// 		totalPrice: updatedPrice,
	// 		ingredients: updatedIngredients
	// 	});
	// 	this.updatePurchase(updatedIngredients);
	// };
	// removeIngredientHandle = (type) => {
	// 	const oldCount = this.state.ingredients[type];
	// 	if (oldCount <= 0) {
	// 		return;
	// 	}
	// 	const updatedCount = oldCount - 1;
	// 	const updatedIngredients = {
	// 		...this.state.ingredients
	// 	};
	// 	updatedIngredients[type] = updatedCount;
	// 	const priceDeduction = INGREDIENT_PRICE[type];
	// 	const oldPrice = this.state.totalPrice;
	// 	const updatedPrice = oldPrice - priceDeduction;

	// 	this.setState({
	// 		totalPrice: updatedPrice,
	// 		ingredients: updatedIngredients
	// 	});
	// 	this.updatePurchase(updatedIngredients);
	// };

	const disableInfo = {
		...props.ings
	};

	for (let key in disableInfo) {
		disableInfo[key] = disableInfo[key] <= 0;
	}

	let orderSummary = null;
	let burger = props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
	if (props.ings) {
		burger = (
			<Fragment>
				<Burger ingredients={props.ings} />

				<BurgerControls
					price={props.price}
					ingredientAdded={props.onAddIngredient}
					ingredientRemoved={props.onRemoveIngredient}
					disabled={disableInfo}
					purchasable={!updatePurchase(props.ings)}
					order={purchaseHandler}
					isAuth={props.isAuthenticated}
				/>
			</Fragment>
		);
		orderSummary = (
			<OrderSummary
				ingredients={props.ings}
				purchaseCancel={purchaseCancel}
				purchaseContinue={purchaseContinue}
				price={props.price}
			/>
		);
	}

	return (
		<Fragment>
			{burger}
			<Modal show={purchasing} modalClosed={purchaseCancel}>
				{orderSummary}
			</Modal>
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	ings: state.burgerBuilder.ingredients,
	price: state.burgerBuilder.totalPrice,
	error: state.burgerBuilder.error,
	isAuthenticated: state.auth.token !== null
});
const mapDispatchToProps = (dispatch) => ({
	onAddIngredient: (ingName) => dispatch(actions.addIngredient(ingName)),
	onRemoveIngredient: (ingName) => dispatch(actions.removeIngredient(ingName)),
	onInitIngredients: () => dispatch(actions.initIngredients()),
	onPurchaseInit: () => dispatch(actions.purchaseInit()),
	onSetAuthRedirectPath: (path) => dispatch(actions.setRedirectPath(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
