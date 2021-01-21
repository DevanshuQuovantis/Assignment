import React from 'react';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import AudioRecorder from './AudioRecorder';

describe('AudioRecorder', () => {
  describe('Rendering', () => {
    it('should match to snapshot', () => {
      const component = renderer.create(<AudioRecorder />).toJSON();
      expect(component).toMatchSnapshot();
    });
  });
});
