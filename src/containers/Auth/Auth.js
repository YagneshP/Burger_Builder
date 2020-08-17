import React, { useEffect, useState } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { checkValidity } from '../../shared/utility';

const Auth = (props) => {
	const [ authForm, setAuthForm ] = useState({
		email: {
			elementType: 'input',
			elementConfig: {
				type: 'email',
				placeholder: 'Your Email Address'
			},
			value: '',
			validation: {
				required: true,
				isEmail: true
			},
			valid: false,
			touched: false
		},
		password: {
			elementType: 'input',
			elementConfig: {
				type: 'password',
				placeholder: 'Your Password'
			},
			value: '',
			validation: {
				required: true,
				minLength: 6
			},
			valid: false,
			touched: false
		}
	});
	const [ isSignUp, setIsSignUp ] = useState(true);
	const { buildingBurger, authRedirectPath, onSetAuthRedirectPath } = props;
	useEffect(
		() => {
			if (!buildingBurger && authRedirectPath !== '/') {
				onSetAuthRedirectPath();
			}
		},
		[ buildingBurger, authRedirectPath, onSetAuthRedirectPath ]
	);

	const handleChange = (event, contolsElement) => {
		const updatedControlForm = {
			...authForm,
			[contolsElement]: {
				...authForm[contolsElement],
				value: event.target.value,
				valid: checkValidity(event.target.value, authForm[contolsElement].validation),
				touched: true
			}
		};
		setAuthForm(updatedControlForm);

		// const updatedFormElement = {
		// 	...updatedOrderForm[elementIdentifier]
		// };
		// updatedFormElement.value = event.target.value;
		// updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
		// updatedFormElement.touched = true;
		// updatedOrderForm[elementIdentifier] = updatedFormElement;
		// let formValid = true;
		// for (let elementIdentifier in updatedOrderForm) {
		// 	formValid = updatedOrderForm[elementIdentifier].valid && formValid;
		// }
		// this.setState({
		// 	controls: updatedOrderForm,
		// 	formValid: formValid
		// });
	};

	const handleClick = () => {
		setIsSignUp(!isSignUp);
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		props.onAuth(authForm.email.value, authForm.password.value, isSignUp);
	};

	let formElementArray = [];
	for (let key in authForm) {
		formElementArray.push({
			id: key,
			config: authForm[key]
		});
	}
	let form = (
		<div>
			<form onSubmit={handleSubmit}>
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
				<Button btnType="Success">Submit</Button>
			</form>
			<Button clicked={handleClick} btnType="Danger">
				Switch to {isSignUp ? 'Sign IN' : 'Sign UP'}
			</Button>
		</div>
	);
	if (props.loading) {
		form = <Spinner />;
	}
	let errorMessage = null;
	if (props.error) {
		errorMessage = <p>{props.error.message}</p>;
	}
	let authRedirect = null;
	if (props.isAuthenticated) {
		authRedirect = <Redirect to={props.authRedirectPath} />;
	}
	return (
		<div className={classes.Auth}>
			{authRedirect}
			{errorMessage}
			{form}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuthenticated: state.auth.token !== null,
		buildingBurger: state.burgerBuilder.building,
		authRedirectPath: state.auth.authRedirectPath
	};
};
const mapDispatchToProps = (dispatch) => ({
	onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
	onSetAuthRedirectPath: () => dispatch(actions.setRedirectPath('/'))
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
