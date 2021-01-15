import React, {useEffect, useRef} from 'react';
import {View, Text, TouchableOpacity, Animated} from 'react-native';
import {Icon} from 'native-base';
import {ResponseOptionTypes} from './index';
import styles from './styles';

const ResponseBar = (props) => {
  const {
    showResponse,
    handleVideoPlayerTouch,
    getUserSelectedResponseOption,
    navigation,
  } = props;

  // response options animation
  const animationValue = useRef(new Animated.Value(500)).current;

  // starting animation of control bar & header
  const startAnimation = () => {
    Animated.timing(animationValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  /**
   * Managing animation for response options bar -
   * when options are showed
   */
  useEffect(() => {
    startAnimation();
  }, [showResponse]);

  const transformStyleResponseOptions = {
    transform: [
      {
        translateY: animationValue,
      },
    ],
  };

  /**
   * handling back button event.
   * Also, hiding controls modal
   */
  const handleBackButton = () => {
    handleVideoPlayerTouch();
    navigation.goBack();
  };

  // handling user selected response option
  const handleUserResponseOption = (optionType) => {
    getUserSelectedResponseOption(optionType);
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleBackButton}>
          <Icon type="AntDesign" name="left" style={styles.backIcon} />
        </TouchableOpacity>
      </View>
      <View style={{flex: 0.7}} />

      <Animated.View style={transformStyleResponseOptions}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>How would you like to respond?</Text>
        </View>

        <View style={styles.videoControlContainer}>
          <TouchableOpacity
            style={styles.optionContainer}
            onPress={() =>
              handleUserResponseOption(
                ResponseOptionTypes.VIDEO_RESPONSE_OPTION,
              )
            }>
            <Icon
              type="AntDesign"
              name="videocamera"
              style={styles.optionIcon}
            />
            <Text style={styles.optionText}>Video</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionContainer}
            onPress={() =>
              handleUserResponseOption(
                ResponseOptionTypes.AUDIO_RESPONSE_OPTION,
              )
            }>
            <Icon
              type="FontAwesome"
              name="microphone"
              style={styles.optionIcon}
            />
            <Text style={styles.optionText}>Audio</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionContainer}
            onPress={() =>
              handleUserResponseOption(ResponseOptionTypes.TEXT_RESPONSE_OPTION)
            }>
            <Icon type="AntDesign" name="filetext1" style={styles.optionIcon} />
            <Text style={styles.optionText}>Text</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

export default ResponseBar;
