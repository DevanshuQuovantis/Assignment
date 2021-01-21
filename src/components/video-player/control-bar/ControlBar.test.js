import React from 'react';
import {shallow} from 'enzyme';
import ControlBar from './ControlBar';

describe('Video Player - ControlBar', () => {
  describe('Rendering', () => {
    it('should match to snapshot', () => {
      const component = shallow(
        <ControlBar
          isPause={false}
          showControls={true}
          videoData={{presentDuration: 1, totalDuration: 5}}
        />,
      );
      expect(component).toMatchSnapshot();
      component.setProps({isPause: true, showControls: false});
      expect(component).toMatchSnapshot();
    });
  });
});

describe('Video Player - ControlBar', () => {
  describe('Rendering', () => {
    it('should match to snapshot', () => {
      const component = shallow(
        <ControlBar
          isPause={true}
          showControls={true}
          videoData={{presentDuration: 12, totalDuration: 50}}
        />,
      );
      expect(component).toMatchSnapshot();
      component.setProps({isPause: false, showControls: true});
      expect(component).toMatchSnapshot();
    });
  });
});

describe('Video Player - ControlBar', () => {
  describe('Rendering', () => {
    it('should match to snapshot', () => {
      const component = shallow(
        <ControlBar
          isPause={false}
          showControls={false}
          videoData={{presentDuration: 0, totalDuration: 1}}
        />,
      );
      expect(component).toMatchSnapshot();
    });
  });
});
describe('Video Player - ControlBar', () => {
  describe('Rendering', () => {
    it('should match to snapshot', () => {
      const component = shallow(
        <ControlBar
          isPause={true}
          showControls={false}
          videoData={{presentDuration: 3, totalDuration: 8}}
        />,
      );
      expect(component).toMatchSnapshot();
    });
  });
});
