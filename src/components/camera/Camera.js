import React, {useRef, useState, useEffect} from 'react';
import {TouchableOpacity, View, Alert} from 'react-native';
import {Icon} from 'native-base';
import {RNCamera} from 'react-native-camera';
import {addToDb, getLastResponseId} from '../../utils/RealmOperations';
import {ResponseOptionTypes} from '../video-player';
import styles from './styles';

const Camera = (props) => {
  const {navigation} = props;
  const cameraRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false); // is camera recording
  const [cameraType, setCameraType] = useState('front'); // camera recording type
  const [cameraData, setCameraData] = useState(); // camera recording data
  const [toSave, setToSave] = useState(false); // whether to save recording or proceed to record again

  // alert to proceed or exit
  const askAlert = () => {
    setToSave(false);
    Alert.alert(
      'Proceed again?',
      'Do you wish to record your video response again?',
      [
        {
          text: 'Save',
          onPress: () => {
            setToSave(true);
          },
        },
        {
          text: 'Record again',
          onPress: () => {
            setToSave(false);
          },
        },
      ],
      {cancelable: false},
    );
  };

  /**
   * if user proceeds to save -
   * save recording to database
   */
  useEffect(() => {
    if (toSave) {
      saveRecording(cameraData);
    }
  }, [toSave]);

  // saving our response to the database & navigating back.
  const saveRecording = async (data) => {
    if (cameraRef) {
      const responseId = await getLastResponseId();
      data['responseType'] = ResponseOptionTypes.VIDEO_RESPONSE_OPTION;
      addToDb(data, responseId);
      navigation.goBack();
    }
  };

  // when user starts/stop recording
  const startStopRecording = async () => {
    if (!isRecording) {
      if (cameraRef) {
        const promise = cameraRef.current.recordAsync();
        if (promise) {
          setIsRecording(true);
          const data = await promise;
          setCameraData(data);
        }
      }
    } else {
      if (cameraRef) {
        cameraRef.current.stopRecording();
      }
      setIsRecording(false);
      askAlert();
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
