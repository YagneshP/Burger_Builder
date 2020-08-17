import { useEffect, useState } from 'react';

export default (httpClient) => {
	const [ error, setError ] = useState(null);

	const reqInsterceptor = httpClient.interceptors.request.use((req) => {
		setError(null);
		return req;
	});
	const resInterceptor = httpClient.interceptors.response.use(
		(res) => res,
		(err) => {
			setError(err);
		}
	);

	useEffect(
		() => {
			httpClient.interceptors.request.eject(reqInsterceptor);
			httpClient.interceptors.response.eject(resInterceptor);
		},
		[ resInterceptor, reqInsterceptor, httpClient.interceptors.request, httpClient.interceptors.response ]
	);

	const errorConfirmed = () => {
		setError(null);
	};

	return [ error, errorConfirmed ];
};
