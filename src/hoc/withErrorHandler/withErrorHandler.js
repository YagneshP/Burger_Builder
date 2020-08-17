import React, { Fragment } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import useHttpHandler from '../../hooks/http-error-handler';

const withErrorHandler = (WrappedComponent, axios) => {
	return (props) => {
		const [ error, errorConfirmed ] = useHttpHandler(axios);

		return (
			<Fragment>
				<Modal show={error} modalClosed={errorConfirmed}>
					{error ? error.message : null}
				</Modal>
				<WrappedComponent {...props} />
			</Fragment>
		);
	};
};

export default withErrorHandler;
