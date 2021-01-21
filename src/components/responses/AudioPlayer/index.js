import React, {useRef, useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Animated, Platform} from 'react-native';
import {Icon} from 'native-base';
import Video from 'react-native-video';
import RNFS from 'react-native-fs';
import styles from '../styles';

const AudioPlayer = ({item: {createdDate, response}}) => {
  const audioPlayerRef = useRef(null); // to take ref of AudioPlayer
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // to keep track of video
  const [videoData, setVideoData] = useState({
    totalDuration: null,
    presentDuration: null,
  });
  const progressAnimation = useRef(new Animated.Value(0)).current;

  // animating progress when video starts to play
  useEffect(() => {
    isAudioPlaying &&
      Animated.timing(progressAnimation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
  }, [isAudioPlaying]);

  // handling play/pause of audio player
  const handlePlayPauseTouch = () => {
    setIsAudioPlaying(!isAudioPlaying);
  };

  // storing video progress
  const handleVideoProgress = ({currentTime, seekableDuration}) => {
    setVideoData({
      totalDuration: seekableDuration,
      presentDuration: currentTime,
    });
  };
  const savedAt = new Date(createdDate).toLocaleString();

  presentDurationInMinutes = (videoData.presentDuration / 60)
    ?.toFixed(2)
    .replace('.', ':');
  totalDurationInMinutes = (videoData.totalDuration / 60)
    ?.toFixed(2)
    .replace('.', ':');

  const source =
    Platform.OS === 'android'
      ? `file"///${response}`
      : RNFS.CachesDirectoryPath + '/' + response;
  return (
    <View style={styles.responseContainer}>
      <Text style={styles.savedAt}>Saved At: {savedAt}</Text>
      <View style={styles.videoContainer}>
        <Text style={styles.responseIs}>Response is: Audio</Text>
        <Video
          audioOnly={true}
          ref={audioPlayerRef}
          source={{uri: source}}
          paused={!isAudioPlaying}
          onProgress={handleVideoProgress}
          repeat={true}
        />
        <View style={styles.progressView}>
          {!isAudioPlaying ? (
            <TouchableOpacity onPress={handlePlayPauseTouch}>
              <Icon
                type="Ionicons"
                name="play-sharp"
                style={styles.controlIcon}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handlePlayPauseTouch}>
              <Icon type="Ionicons" name="pause" style={styles.controlIcon} />
            </TouchableOpacity>
          )}
          {isAudioPlaying && (
            <Animated.View style={{opacity: progressAnimation}}>
              <Text style={[styles.responseIs, {padding: 0}]}>
                {presentDurationInMinutes} / {totalDurationInMinutes}
              </Text>
            </Animated.View>
          )}
        </View>
      </View>
    </View>
  );
};

export default AudioPlayer;
