import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItem from './NavigationItem/NavigationItem';
import NavigationItems from './NavigationItems';

configure({ adapter: new Adapter() });

describe('<Navigation Items/>', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<NavigationItems />);
	});
	it('renders two <Navigation item /> if not authenticate', () => {
		expect(wrapper.find(NavigationItem)).toHaveLength(2);
	});
	it('renders three <Navigation item /> if  authenticate', () => {
		wrapper.setProps({ isAuthenticated: true });
		expect(wrapper.find(NavigationItem)).toHaveLength(3);
	});
	it('contain "LogOut" <Navigation item /> if  authenticate', () => {
		wrapper.setProps({ isAuthenticated: true });
		expect(wrapper.contains(<NavigationItem link="/logout">LogOut</NavigationItem>)).toEqual(true);
	});
});
