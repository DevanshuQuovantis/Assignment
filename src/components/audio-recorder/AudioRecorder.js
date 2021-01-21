import React, {useState, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import LottieView from 'lottie-react-native';
import {Icon} from 'native-base';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {addToDb, getLastResponseId} from '../../utils/RealmOperations';
import {Button} from '../common';
import {ResponseOptionTypes} from '../video-player';
import styles from './styles';

const audioRecorderPlayer = new AudioRecorderPlayer();

const AudioRecorder = (props) => {
  const rippleRef = useRef();
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState('0:00:00'); // recording time is 0 initially.
  const [audioPath, setAudioPath] = useState(null); // used to save the path in realm database
  const {navigation} = props;

  // navigation back
  const handleBackButton = () => {
    navigation.goBack();
  };

  /**
   * In case for android,
   * we need to explicitly ask permission
   * for recording audio & saving audio to external storage
   * This function helps to get permission from the user.
   */
  const askRequiredPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Permissions for write access',
          message: 'Give permission to your storage to write a file',
          buttonPositive: 'Okay',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Permissions for write access',
            message: 'Give permission to your storage to write a file',
            buttonPositive: 'Okay',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          return true;
        }
      }
      return false;
    } else return true;
  };

  // when recording starts
  const onStartRecord = async () => {
    const isPermitted = await askRequiredPermission(); // asking permission
    if (isPermitted) {
      const fileName = new Date().getTime();
      const path = Platform.select({
        ios: `assignment_${fileName}.m4a`,
        android: `sdcard/assignment_${fileName}.mp4`,
      });
      // saving audio path in a local state to add it in realm database.
      setAudioPath(path);
      setRecordingTime('0:00:00');
      const result = await audioRecorderPlayer.startRecorder(path); // starting recording
      rippleRef.current.play(); // animating ripple effect
      audioRecorderPlayer.addRecordBackListener((e) => {
        // setting recording time
        setRecordingTime(
          audioRecorderPlayer.mmssss(Math.floor(e.current_position)),
        );
        return;
      });
    }
  };

  // when recording stops
  const onStopRecord = async () => {
    await audioRecorderPlayer.stopRecorder(); // stopping recording
    audioRecorderPlayer.removeRecordBackListener();
    rippleRef.current.reset(); // stopping ripple effect
  };

  // handling recording & ripple animation
  const handleAudioRecorder = async () => {
    setIsRecording(!isRecording);
    if (isRecording) {
      onStopRecord();
    } else {
      onStartRecord();
    }
  };

  const handleSave = async () => {
    if (!isRecording) {
      const id = await getLastResponseId();
      const data = {
        uri: audioPath,
        responseType: ResponseOptionTypes.AUDIO_RESPONSE_OPTION,
      };
      addToDb(data, id);
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.headerContainer}
        onPress={handleBackButton}>
        <Icon type="AntDesign" name="left" style={styles.backIcon} />
        <Text style={styles.back}>Back</Text>
      </TouchableOpacity>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>
          What's your reason for being here?
        </Text>
      </View>
      <View style={styles.rippleCircleContainer}>
        <LottieView
          ref={rippleRef}
          source={require('../../animations/ripple.json')}
          style={styles.rippleCircle}
        />
        <Text style={styles.rippleText}>{recordingTime}</Text>
      </View>
      <View style={styles.buttonHeading}>
        <Text style={styles.headingText}>
          Press button to start/stop recording
        </Text>
        <TouchableOpacity style={styles.recorder} onPress={handleAudioRecorder}>
          {isRecording ? (
            <Icon
              type="Entypo"
              name="controller-stop"
              style={styles.audioIcon}
            />
          ) : (
            <Icon
              type="FontAwesome"
              name="microphone"
              style={styles.audioIcon}
            />
          )}
        </TouchableOpacity>
        <Text style={styles.warningText}>
          Don't worry, you can try again before saving it.
        </Text>
      </View>

      <View style={styles.saveContainer}>
        <Button buttonTitle={'Save'} getTouchableEvent={handleSave} />
      </View>
    </View>
  );
};

export default AudioRecorder;
