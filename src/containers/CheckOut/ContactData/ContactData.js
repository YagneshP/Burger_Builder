import React, { useState } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as orderAction from '../../../store/actions/index';
import { checkValidity } from '../../../shared/utility';
const ContactData = (props) => {
	const [ orderForm, setOrderForm ] = useState({
		name: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Your Name'
			},
			value: '',
			validation: {
				required: true
			},
			valid: false,
			touched: false
		},
		street: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Your Street Name'
			},
			value: '',
			validation: {
				required: true
			},
			valid: false,
			touched: false
		},
		zipcode: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Your ZIP Code'
			},
			value: '',
			validation: {
				required: true,
				minLength: 5,
				maxLength: 5
			},
			valid: false,
			touched: false
		},
		country: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Your Country'
			},
			value: '',
			validation: {
				required: true
			},
			valid: false,
			touched: false
		},
		email: {
			elementType: 'input',
			elementConfig: {
				type: 'email',
				placeholder: 'Your E-Mail'
			},
			value: '',
			validation: {
				required: true
			},
			valid: false,
			touched: false
		},
		deliveryMethod: {
			elementType: 'select',
			elementConfig: {
				options: [
					{ value: 'fastest', displayValue: 'Fastest' },
					{ value: 'cheapest', displayValue: 'Cheapest' }
				]
			},
			validation: {},
			value: 'fastest',
			valid: true
		}
	});
	const [ formValid, setFormValid ] = useState(false);

	const orderHandler = (event) => {
		event.preventDefault();

		let formData = {};
		for (let formElement in orderForm) {
			formData[formElement] = orderForm[formElement].value;
		}
		const order = {
			ingredients: props.ings,
			price: props.price,
			orderData: formData,
			userId: props.userId
		};
		props.onOrderBurger(order, props.token);
	};

	const handleChange = (event, elementIdentifier) => {
		const updatedOrderForm = {
			...orderForm
		};
		const updatedFormElement = {
			...updatedOrderForm[elementIdentifier]
		};
		updatedFormElement.value = event.target.value;
		updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
		updatedFormElement.touched = true;
		updatedOrderForm[elementIdentifier] = updatedFormElement;
		let formValid = true;
		for (let elementIdentifier in updatedOrderForm) {
			formValid = updatedOrderForm[elementIdentifier].valid && formValid;
		}
		setOrderForm(updatedOrderForm);
		setFormValid(formValid);
	};

	let formElementArray = [];
	for (let key in orderForm) {
		formElementArray.push({
			id: key,
			config: orderForm[key]
		});
	}
	let form = (
		<form onSubmit={orderHandler}>
			{formElementArray.map((formElement) => {
				return (
					<Input
						key={formElement.id}
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
						invalid={!formElement.config.valid}
						showValidation={formElement.config.validation}
						touched={formElement.config.touched}
						changed={(event) => handleChange(event, formElement.id)}
					/>
				);
			})}
			<Button btnType="Success" disabled={!formValid}>
				{' '}
				Order{' '}
			</Button>
		</form>
	);
	if (props.loading) {
		form = <Spinner />;
	}
	return (
		<div className={classes.ContactData}>
			<h4> Enter your contact detail</h4>
			{form}
		</div>
	);
};

const mapStateToProps = (state) => ({
	ings: state.burgerBuilder.ingredients,
	price: state.burgerBuilder.totalPrice,
	loading: state.order.loading,
	token: state.auth.token,
	userId: state.auth.userId
});

const mapDispatchToProps = (dispatch) => ({
	onOrderBurger: (orderData, token) => dispatch(orderAction.puchaseBurger(orderData, token))
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
