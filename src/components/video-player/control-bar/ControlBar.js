import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Pressable} from 'react-native';
import {Icon} from 'native-base';
import {ControlBarTypes} from './index';
import styles from './styles';

const ControlBar = (props) => {
  const {
    isPause,
    handleVideoPlayerTouch,
    handleResponseOptions,
    handlePlayPause,
    handleSeek,
    navigation,
  } = props;

  const [pause, setPause] = useState(isPause || false);

  /**
   * handling back button event.
   * Also, hiding controls modal
   */
  const handleBackButton = () => {
    handleVideoPlayerTouch();
    navigation.goBack();
  };

  // controlling video player to play pause
  const handlePlayPauseTouch = () => {
    handlePlayPause(!pause);
    setPause(!pause);
  };

  /**
   * controlling video player - stop
   * showing response options
   */
  const handleStop = () => {
    handlePlayPauseTouch();
    handleResponseOptions();
  };
  return (
    <View style={{flex: 1}}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.headerView} onPress={handleBackButton}>
          <Icon type="AntDesign" name="left" style={styles.backIcon} />
          <Text style={styles.back}>Back</Text>
        </TouchableOpacity>
      </View>

      <Pressable style={{flex: 1}} onPress={handleVideoPlayerTouch} />

      <View style={styles.videoControlContainer}>
        <View style={styles.controlView}>
          <TouchableOpacity
            onPress={() => handleSeek(ControlBarTypes.SEEK_FORWARD)}
            style={[styles.seekControl, {alignItems: 'flex-start'}]}>
            <Icon
              type="AntDesign"
              name="rightcircle"
              style={styles.controlIcon}
            />
          </TouchableOpacity>

          {pause ? (
            <View style={styles.playContainer}>
              <TouchableOpacity
                onPress={handlePlayPauseTouch}
                style={{justifyContent: 'center', alignItems: 'center'}}>
                <Icon
                  type="Entypo"
                  name="controller-play"
                  style={[styles.controlIcon, {marginLeft: 3}]}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.playPauseContainer}>
              <TouchableOpacity onPress={handlePlayPauseTouch}>
                <Icon
                  type="AntDesign"
                  name="pause"
                  style={styles.controlIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleStop}>
                <Icon
                  type="Entypo"
                  name="controller-stop"
                  style={styles.controlIcon}
                />
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            onPress={() => handleSeek(ControlBarTypes.SEEK_BACKWARD)}
            style={[styles.seekControl, {alignItems: 'flex-end'}]}>
            <Icon
              type="AntDesign"
              name="leftcircle"
              style={styles.controlIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ControlBar;
