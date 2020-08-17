import axios from 'axios';

//creating axios instance to send order to firebase
const instance = axios.create({
	baseURL: 'https://react-my-burger-d017b.firebaseio.com/'
});
export default instance;
