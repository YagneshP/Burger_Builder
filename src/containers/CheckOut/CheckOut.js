import React from 'react';
import CheckOutSummary from '../../components/Order/CheckOutSummary/CheckOutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

const CheckOut = (props) => {
	// state = {
	// 	ingredients: null,
	// 	price: 0
	// };

	// componentWillMount() {
	// 	const query = new URLSearchParams(this.props.location.search);
	// 	const ingredients = {};
	// 	let price = 0;
	// 	for (let param of query.entries()) {
	// 		if (param[0] === 'price') {
	// 			price = param[1];
	// 		} else {
	// 			//["salad", "0"]
	// 			ingredients[param[0]] = +param[1];
	// 		}
	// 	}
	// 	this.setState({ ingredients: ingredients, price: price });
	// }
	const checkoutCancelled = () => {
		props.history.goBack();
	};
	const checkoutContinued = () => {
		props.history.replace('/checkout/contact-data');
	};

	let summary = <Redirect to="/" />;
	if (props.ings) {
		const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;
		summary = (
			<div>
				{purchasedRedirect}
				<CheckOutSummary
					ingredients={props.ings}
					checkoutCancelled={checkoutCancelled}
					checkoutContinued={checkoutContinued}
				/>

				<Route path={props.match.path + '/contact-data'} component={ContactData} />
			</div>
		);
	}
	return summary;
};

const mapStateToProps = (state) => ({
	ings: state.burgerBuilder.ingredients,
	purchased: state.order.purchased
});

export default connect(mapStateToProps)(CheckOut);
