import 'jsdom-global/register';
import React from 'react';
import {shallow, mount} from 'enzyme';
import {TouchableOpacity} from 'react-native';
import renderer from 'react-test-renderer';
import Button from './Button';

describe('Button', () => {
  describe('Rendering', () => {
    it('should match to snapshot', () => {
      const component = shallow(
        <Button
          buttonTitle={'a'}
          getTouchableEvent={() => console.log('===123===')}
        />,
      );
      component.find(TouchableOpacity).simulate('press');
      expect(component).toMatchSnapshot();
    });
  });
});
