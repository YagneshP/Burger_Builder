import React, { Fragment } from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const SideDrawer = (props) => {
	let attachedClass = [ classes.SideDrawer, classes.Close ];
	if (props.show) {
		attachedClass = [ classes.SideDrawer, classes.Open ];
	}
	return (
		<Fragment>
			<Backdrop show={props.show} clicked={props.closed} />
			<div className={attachedClass.join(' ')} onClick={props.closed}>
				<div className={classes.Logo}>
					<Logo />
				</div>

				<nav>
					<NavigationItems isAuthenticated={props.isAuth} />
				</nav>
			</div>
		</Fragment>
	);
};

export default SideDrawer;
