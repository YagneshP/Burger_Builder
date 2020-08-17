import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
	//get the ingredients state propty from BurgerBuilder component
	let transformedIngredients = Object.keys(props.ingredients) // Object.keys converts array ["salad", "becon", "meat"] ingretiants objects keys into Strings of array
		.map((igKey) => {
			// console.log(props.ingredients[igKey]);
			//Array consturctor get the value of key from ingredient Obj like(salad : 2)  and construct an array of [,] two empty space
			return [ ...Array(props.ingredients[igKey]) ].map((_, i) => {
				return <BurgerIngredient key={igKey + i} type={igKey} />;
			});
		})
		.reduce((arr, el) => {
			// this will return [] if there is no ingredients value
			return arr.concat(el);
		}, []);

	if (transformedIngredients.length === 0) {
		transformedIngredients = <p> Please add your ingredients </p>;
	}
	return (
		<div className={classes.Burger}>
			<BurgerIngredient type="bread-top" />
			{transformedIngredients}
			<BurgerIngredient type="bread-bottom" />
		</div>
	);
};

export default Burger;
