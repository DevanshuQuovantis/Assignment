import React from 'react';
import Modal from 'react-native-modal';
import Colors from '../../../constants/Theme';
import {ControlBar, ResponseBar} from '../index';
import styles from './styles';

const VideoControls = (props) => {
  const {showControls, showResponse} = props;

  return (
    <Modal
      animationIn="fadeIn"
      animationOut="fadeOut"
      isVisible={showControls}
      style={styles.modalContainer}
      backdropColor={Colors.backdrop}>
      {showResponse ? <ResponseBar {...props} /> : <ControlBar {...props} />}
    </Modal>
  );
};

export default VideoControls;
