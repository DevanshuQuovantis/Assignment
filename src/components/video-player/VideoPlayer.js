import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import Video from 'react-native-video';
import {VideoControls} from './video-controls';
import styles from './styles';

const VIDEO_PATH = require('../../../AssignmentVideo2.mp4');

const VideoPlayer = () => {
  const [showControls, setShowControls] = useState(false);
  // handling errors
  const handleError = (error) => {
    console.log('Error while playing video: ', error);
  };

  // listening to press events on video player
  const handleVideoPress = () => {
    setShowControls(!showControls);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleVideoPress}>
      <Video
        paused={showControls}
        source={VIDEO_PATH}
        resizeMode="stretch"
        onError={handleError}
        style={styles.backgroundVideo}
      />
      <VideoControls showControls={showControls} />
    </TouchableOpacity>
  );
};

export default VideoPlayer;
