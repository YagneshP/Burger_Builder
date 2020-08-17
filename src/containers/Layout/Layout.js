import React, { Fragment, useState } from 'react';
import classes from './Layout.module.css';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import { connect } from 'react-redux';
const Layout = (props) => {
	const [ showSideDrawer, setShowSideDrawer ] = useState(false);
	const sideDrawerClosedHandler = () => {
		setShowSideDrawer(false);
	};
	const sideDrawerToggleHandler = () => {
		setShowSideDrawer(!showSideDrawer);
	};

	return (
		<Fragment>
			<Toolbar isAuth={props.isAuthenticated} drawerToggleClicked={sideDrawerToggleHandler} />
			<SideDrawer isAuth={props.isAuthenticated} show={showSideDrawer} closed={sideDrawerClosedHandler} />
			<main className={classes.Content}>{props.children}</main>
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.token !== null
});

export default connect(mapStateToProps)(Layout);
