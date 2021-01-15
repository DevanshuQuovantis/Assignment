import React, {useState, useEffect, useRef} from 'react';
import {View, Text, TouchableOpacity, Pressable, Animated} from 'react-native';
import Slider from 'react-native-slider';
import {Icon} from 'native-base';
import {ControlBarTypes} from './index';
import styles from './styles';

const ControlBar = (props) => {
  const {
    isPause,
    showControls,
    videoData,
    handleVideoPlayerTouch,
    handleResponseOptions,
    handlePlayPause,
    handleSeek,
    navigation,
  } = props;

  const [pause, setPause] = useState(isPause || false);

  // to control animations for control bar, header & play pause button
  const headerAnimation = useRef(new Animated.Value(-100)).current;
  const controlBarAnimation = useRef(new Animated.Value(100)).current;
  const playPauseButtonAnim = useRef(new Animated.Value(isPause ? 60 : 120))
    .current;
  const [videoTotalDuration, setVideoTotalDuration] = useState(null);

  // starting animation of control bar & header
  const startAnimation = () => {
    Animated.parallel([
      Animated.timing(headerAnimation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(controlBarAnimation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // hiding animation of control bar & header
  const hideAnimation = () => {
    Animated.parallel([
      Animated.timing(headerAnimation, {
        toValue: -100,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(controlBarAnimation, {
        toValue: 100,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  /**
   *
   */
  useEffect(() => {
    setVideoTotalDuration(videoData.totalDuration);
  }, []);

  useEffect(() => {
    showControls ? startAnimation() : hideAnimation();
  }, [showControls]);

  /**
   * handling back button event.
   * Also, hiding controls modal
   */
  const handleBackButton = () => {
    handleVideoPlayerTouch();
    navigation.goBack();
  };

  // controlling video player to play pause with its animation
  const handlePlayPauseTouch = () => {
    pause
      ? Animated.timing(playPauseButtonAnim, {
          toValue: 120,
          duration: 200,
          useNativeDriver: false,
        }).start()
      : Animated.timing(playPauseButtonAnim, {
          toValue: 60,
          duration: 200,
          useNativeDriver: false,
        }).start();
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

  const transformStyleHeader = {
    transform: [
      {
        translateY: headerAnimation,
      },
    ],
  };

  const transformStyleControlBar = {
    transform: [
      {
        translateY: controlBarAnimation,
      },
    ],
  };

  const presentDurationInMinutes = (videoData.presentDuration / 60)
    ?.toFixed(2)
    .replace('.', ':');
  const totalDurationInMinutes = (videoTotalDuration / 60)
    ?.toFixed(2)
    .replace('.', ':');

  return (
    <View style={{flex: 1}}>
      <Animated.View style={[styles.headerContainer, transformStyleHeader]}>
        <TouchableOpacity style={styles.headerView} onPress={handleBackButton}>
          <Icon type="AntDesign" name="left" style={styles.backIcon} />
          <Text style={styles.back}>Back</Text>
        </TouchableOpacity>
      </Animated.View>

      <Pressable style={{flex: 1}} onPress={handleVideoPlayerTouch} />

      <Animated.View
        style={[styles.videoControlContainer, transformStyleControlBar]}>
        <Slider
          disabled={true}
          animateTransitions={true}
          animationType={'timing'}
          animationConfig={{useNativeDriver: false}}
          value={videoData?.presentDuration}
          maximumValue={videoTotalDuration}
          minimumValue={0}
          style={{height: 0}}
          trackStyle={{height: 2}}
          thumbStyle={{height: 10, width: 10}}
        />
        <View style={styles.durationContainer}>
          <Text style={styles.duration}>{presentDurationInMinutes}</Text>
          <Text style={styles.duration}>{totalDurationInMinutes}</Text>
        </View>
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

          <Animated.View
            style={[
              styles.playPauseContainer,
              {
                width: playPauseButtonAnim,
              },
            ]}>
            {pause ? (
              <TouchableOpacity
                onPress={handlePlayPauseTouch}
                style={{justifyContent: 'center', alignItems: 'center'}}>
                <Icon
                  type="Entypo"
                  name="controller-play"
                  style={[styles.controlIcon, {marginLeft: 4}]}
                />
              </TouchableOpacity>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flex: 1,
                }}>
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
          </Animated.View>

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
      </Animated.View>
    </View>
  );
};

export default ControlBar;
