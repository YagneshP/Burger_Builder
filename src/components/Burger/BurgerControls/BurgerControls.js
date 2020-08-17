import React from 'react';
import classes from './BurgerControls.module.css';
import BuildControl from './BuildControl/BuildControl';
const controls = [
	{ label: 'Salad', type: 'salad' },
	{ label: 'Bacon', type: 'bacon' },
	{ label: 'Meat', type: 'meat' },
	{ label: 'Cheese', type: 'cheese' }
];
const BurgerControls = (props) => {
	return (
		<div className={classes.BurgerControls}>
			<p>
				{' '}
				Current Price: <strong>{props.price.toFixed(2)}</strong>
			</p>
			{controls.map((el) => {
				return (
					<BuildControl
						key={el.label}
						label={el.label}
						add={() => props.ingredientAdded(el.type)}
						remove={() => props.ingredientRemoved(el.type)}
						disabled={props.disabled[el.type]}
					/>
				);
			})}
			<button className={classes.OrderButton} disabled={props.purchasable} onClick={props.order}>
				{props.isAuth ? 'ORDER NOW' : 'SIGN UP FOR ORDER'}
			</button>
		</div>
	);
};

export default BurgerControls;
