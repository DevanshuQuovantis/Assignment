import React from 'react';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import Homescreen from './Homescreen';

describe('Homescreen', () => {
  describe('Rendering', () => {
    it('should match to snapshot', () => {
      const component = shallow(<Homescreen />);
      expect(component).toMatchSnapshot();
    });
  });
});

describe('Homescreen 2', () => {
  describe('Rendering', () => {
    it('should match to snapshot', () => {
      const component = renderer.create(<Homescreen />).toJSON();
      expect(component).toMatchSnapshot();
    });
  });
});
