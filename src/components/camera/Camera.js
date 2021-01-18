import React, {useRef, useState, useEffect} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Icon} from 'native-base';
import {RNCamera} from 'react-native-camera';
import {addToDb, getLastResponseId} from '../../utils/RealmOperations';
import styles from './styles';

const Camera = (props) => {
  const {navigation} = props;
  const cameraRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [cameraType, setCameraType] = useState('front');

  const startStopRecording = async () => {
    if (!isRecording) {
      if (cameraRef) {
        const promise = cameraRef.current.recordAsync();
        if (promise) {
          console.log('Recording started');
          setIsRecording(true);
          const data = await promise;
          console.log('Recording finished');
          setIsRecording(false);
          const responseId = await getLastResponseId();
          addToDb(data, responseId);
        }
      }
    } else {
      if (cameraRef) {
        cameraRef.current.stopRecording();
        setIsRecording(false);
      }
    }
  };

  // swap camera type
  const swapCamera = () => {
    setCameraType(cameraType === 'front' ? 'back' : 'front');
  };

  // close camera and navigate to home screen
  const closeCamera = () => {
    navigation.navigate('Homescreen');
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        style={styles.preview}
        type={
          cameraType === 'front'
            ? RNCamera.Constants.Type.front
            : RNCamera.Constants.Type.back
        }>
        <View style={styles.cameraControls}>
          <View style={{flex: 0.2}}>
            <TouchableOpacity
              onPress={swapCamera}
              style={[styles.rotate, {alignSelf: 'center'}]}>
              <Icon
                type="FontAwesome"
                name="rotate-right"
                style={styles.rotateIcon}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={startStopRecording} style={styles.capture}>
            {isRecording ? (
              <Icon type="Entypo" name="controller-stop" style={styles.icon} />
            ) : (
              <Icon
                type="Entypo"
                name="controller-play"
                style={[styles.icon, {marginLeft: 4}]}
              />
            )}
          </TouchableOpacity>
          <View style={{flex: 0.2}}>
            <TouchableOpacity
              onPress={closeCamera}
              style={[styles.rotate, {alignSelf: 'center'}]}>
              <Icon type="AntDesign" name="close" style={styles.rotateIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </RNCamera>
    </View>
  );
};

export default Camera;
