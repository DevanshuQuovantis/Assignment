import React, {useState, useRef} from 'react';
import {View, TouchableOpacity, Text, Pressable} from 'react-native';
import LottieView from 'lottie-react-native';
import {Icon} from 'native-base';
import Colors from '../../constants/Theme';
import {Button} from '../common';
import styles from './styles';

const AudioRecorder = (props) => {
  const rippleRef = useRef();
  const [isRecording, setIsRecording] = useState(false);
  const {navigation} = props;

  // navigation back
  const handleBackButton = () => {
    navigation.goBack();
  };

  // handling recording & ripple animation
  const handleAudioRecorder = () => {
    setIsRecording(!isRecording);
    if (isRecording) {
      rippleRef.current.reset();
    } else {
      rippleRef.current.play();
    }
  };

  const handleSave = () => {};

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
          What's your reason from being here?
        </Text>
      </View>
      <View style={styles.rippleCircleContainer}>
        <LottieView
          ref={rippleRef}
          source={require('../../animations/ripple.json')}
          style={styles.rippleCircle}
        />
        <Text style={styles.rippleText}>0.0</Text>
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
