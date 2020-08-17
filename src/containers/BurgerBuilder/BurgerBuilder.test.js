import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BurgerBuilder } from '../BurgerBuilder/BurgerBuilder';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';
configure({ adapter: new Adapter() });

describe('<Burger Builder />', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} />);
	});
	it('renders <Build controls /> if get the ingredients', () => {
		wrapper.setProps({ ings: { salad: 0 } });
		expect(wrapper.find(BurgerControls)).toHaveLength(1);
	});
});
