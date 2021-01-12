import React, {useEffect} from 'react';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import Colors from '../../../constants/Theme';
import styles from './styles';

const VideoControls = (props) => {
  const {showControls} = props;

  return (
    <Modal isVisible={showControls} style={{margin: 0, flex: 1}}>
      <View style={{flex: 1}}>
        <View style={{flex: 0.9}} />
        <View style={{flex: 0.1, backgroundColor: Colors.blue}}></View>
      </View>
    </Modal>
  );
};

export default VideoControls;
