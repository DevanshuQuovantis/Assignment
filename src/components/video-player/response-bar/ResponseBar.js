import React from 'react';
import {View, Text, TouchableOpacity, Pressable} from 'react-native';
import {Icon} from 'native-base';
import {ResponseOptionTypes} from './index';
import styles from './styles';

const ResponseBar = (props) => {
  const {
    handleVideoPlayerTouch,
    getUserSelectedResponseOption,
    navigation,
  } = props;

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
      <View style={{flex: 0.6}} />

      <View style={styles.textContainer}>
        <Text style={styles.text}>How would you like to respond?</Text>
      </View>

      <View style={styles.videoControlContainer}>
        <TouchableOpacity
          style={styles.optionContainer}
          onPress={() =>
            handleUserResponseOption(ResponseOptionTypes.VIDEO_RESPONSE_OPTION)
          }>
          <Icon type="AntDesign" name="videocamera" style={styles.optionIcon} />
          <Text style={styles.optionText}>Video</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionContainer}
          onPress={() =>
            handleUserResponseOption(ResponseOptionTypes.AUDIO_RESPONSE_OPTION)
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
    </View>
  );
};

export default ResponseBar;
