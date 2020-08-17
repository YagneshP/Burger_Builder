import React, { lazy, Suspense, useEffect } from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import { connect } from 'react-redux';
import Spinner from './components/UI/Spinner/Spinner';

const asyncCheckOut = lazy(() => import('./containers/CheckOut/CheckOut'));
const asyncOrders = lazy(() => import('./containers/Orders/Orders'));
const asyncAuth = lazy(() => import('./containers/Auth/Auth'));

const App = (props) => {
	useEffect(
		() => {
			props.onAutoSignUp();
		},
		[ props ]
	);

	let routes = (
		<Suspense fallback={<Spinner />}>
			<Switch>
				<Route path="/auth" component={asyncAuth} />
				<Route exact path="/" component={BurgerBuilder} />
				<Redirect to="/" />
			</Switch>
		</Suspense>
	);

	if (props.isAuthenticated) {
		routes = (
			<Suspense fallback={<Spinner />}>
				<Switch>
					<Route path="/checkout" component={asyncCheckOut} />
					<Route path="/orders" component={asyncOrders} />
					<Route path="/auth" component={asyncAuth} />
					<Route path="/logout" component={Logout} />
					<Route exact path="/" component={BurgerBuilder} />
					<Redirect to="/" />
				</Switch>
			</Suspense>
		);
	}
	return (
		<div className="App">
			<Layout>{routes}</Layout>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.token !== null
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onAutoSignUp: () => dispatch(actions.authCheckState())
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
