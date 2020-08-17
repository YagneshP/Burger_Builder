import React from 'react';
import classes from './Order.module.css';
const Order = (props) => {
	const ingredients = [];
	for (let ingredientName in props.ingredients) {
		ingredients.push({ name: ingredientName, amount: props.ingredients[ingredientName] });
	}

	let Ingredients = ingredients.map((ing) => {
		return (
			<span
				key={ing.name}
				style={{
					textTransform: 'capitalize',
					display: 'inline-block',
					margin: ' 0 8px',
					border: '1px solid #ccc',
					padding: '5px'
				}}
			>
				{ing.name} : <strong>{ing.amount}</strong>
			</span>
		);
	});
	return (
		<div className={classes.Order}>
			{<p>Ingredients: {Ingredients}</p>}
			<p>
				{' '}
				Price : <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong>
			</p>
		</div>
	);
};

export default Order;
