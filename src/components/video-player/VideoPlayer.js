import React, {useState, useRef} from 'react';
import {Pressable} from 'react-native';
import Video from 'react-native-video';
import {VideoControls} from './video-controls';
import {ControlBarTypes, ResponseOptionTypes} from './index';
import styles from './styles';

const VIDEO_PATH = require('../../../AssignmentVideo2.mp4');

const VideoPlayer = ({navigation}) => {
  const videoPlayerRef = useRef(null); // to take ref of VideoPlayer
  const [showControls, setShowControls] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [pause, setPause] = useState(false);
  const [videoData, setVideoData] = useState({
    totalDuration: null,
    presentDuration: null,
  });

  // handling errors
  const handleError = (error) => {
    console.log('Error while playing video: ', error);
  };

  /**
   * listening to press events of video player
   * for showing/hiding player controls
   */
  const handleVideoPress = () => {
    setShowControls(!showControls);
  };

  // controlling video player to play/pause
  const handlePlayPause = (value) => {
    setPause(value);
    setShowResponse(false);
  };

  // showing/hiding user responses
  const handleResponseOptions = () => {
    setShowResponse(!showResponse);
  };

  // storing video progress
  const handleVideoProgress = ({currentTime, playableDuration}) => {
    setVideoData({
      totalDuration: playableDuration,
      presentDuration: currentTime,
    });
  };

  // handling seek - video position forward/backward
  const handleSeek = (type) => {
    switch (type) {
      case ControlBarTypes.SEEK_FORWARD: {
        videoPlayerRef.current.seek(videoData.presentDuration + 10);
        return;
      }
      case ControlBarTypes.SEEK_BACKWARD: {
        videoPlayerRef.current.seek(videoData.presentDuration - 10);
        setVideoData({
          ...videoData,
          presentDuration: videoData.presentDuration - 10,
        });
        return;
      }
      default:
        return;
    }
  };

  /**
   * handling user selected response option -
   * by navigating to its respective screen
   */
  const handleUserSelectedResponseOption = (type) => {
    setShowControls(false);
    setShowResponse(false);
    switch (type) {
      case ResponseOptionTypes.VIDEO_RESPONSE_OPTION: {
        navigation.navigate('Camera');
        return;
      }
      case ResponseOptionTypes.AUDIO_RESPONSE_OPTION: {
        navigation.navigate('AudioRecorder');
        return;
      }
      case ResponseOptionTypes.TEXT_RESPONSE_OPTION: {
        return;
      }
      default:
        return;
    }
  };

  return (
    <Pressable style={styles.container} onPress={handleVideoPress}>
      <Video
        ref={videoPlayerRef}
        source={VIDEO_PATH}
        resizeMode="stretch"
        onError={handleError}
        style={styles.backgroundVideo}
        paused={pause}
        onProgress={handleVideoProgress}
      />
      <VideoControls
        showControls={showControls}
        videoData={videoData}
        showResponse={showResponse}
        isPause={pause}
        handleSeek={handleSeek}
        handleVideoPlayerTouch={handleVideoPress}
        handlePlayPause={handlePlayPause}
        handleResponseOptions={handleResponseOptions}
        getUserSelectedResponseOption={handleUserSelectedResponseOption}
        navigation={navigation}
      />
    </Pressable>
  );
};

export default VideoPlayer;
