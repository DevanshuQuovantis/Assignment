import React, {useRef, useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Animated} from 'react-native';
import {Icon} from 'native-base';
import Video from 'react-native-video';
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
  const handleVideoProgress = ({
    currentTime,
    playableDuration,
    seekableDuration,
  }) => {
    setVideoData({
      totalDuration: seekableDuration,
      presentDuration: currentTime,
    });
  };
  const savedAt = new Date(createdDate).toLocaleString();
  const presentDurationInMinutes = (videoData.presentDuration / 60)
    ?.toFixed(2)
    .replace('.', ':');
  const totalDurationInMinutes = (videoData.totalDuration / 60)
    ?.toFixed(2)
    .replace('.', ':');
  return (
    <View style={styles.responseContainer}>
      <Text style={styles.savedAt}>Saved At: {savedAt}</Text>
      <View style={styles.videoContainer}>
        <Text style={styles.responseIs}>Response is: Audio</Text>
        <Video
          audioOnly={true}
          ref={audioPlayerRef}
          source={{uri: 'file:///' + response}}
          paused={!isAudioPlaying}
          onProgress={handleVideoProgress}
          repeat={true}
        />
        {/* <Video
          audioOnly={true}
          ref={audioPlayerRef}
          source={{uri: 'file:///' + response}}
          resizeMode="cover"
          paused={!isAudioPlaying}
          onProgress={handleVideoProgress}
          repeat={true}
          style={{marginBottom: 20}}
        /> */}
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
