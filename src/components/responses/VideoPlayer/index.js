import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, Animated, Dimensions} from 'react-native';
import {Icon} from 'native-base';
import Video from 'react-native-video';
import styles from '../styles';

const VideoPlayer = ({item: {createdDate, response}}) => {
  const videoPlayerRef = useRef(null); // to take ref of VideoPlayer
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  // to keep track of video
  const [videoData, setVideoData] = useState({
    totalDuration: null,
    presentDuration: null,
  });
  const progressAnimation = useRef(new Animated.Value(0)).current;
  const [dimensions, setDimensions] = useState({height: 0, width: 0});

  // animating progress when video starts to play
  useEffect(() => {
    isVideoPlaying &&
      Animated.timing(progressAnimation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
  }, [isVideoPlaying]);

  // handling play/pause of video player
  const handlePlayPauseTouch = () => {
    setIsVideoPlaying(!isVideoPlaying);
  };

  // storing video progress
  const handleVideoProgress = ({currentTime, seekableDuration}) => {
    setVideoData({
      totalDuration: seekableDuration,
      presentDuration: currentTime,
    });
  };

  // handling video dimensions according to video's orientation
  const handleVideoDimensions = (response) => {
    const {
      width: videoWidth,
      height: videoHeight,
      orientation,
    } = response.naturalSize;
    if (orientation === 'landscape') {
      setDimensions({height: 200, width: '100%'});
    } else {
      setDimensions({height: 300, width: '100%'});
    }
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
        <Text style={styles.responseIs}>Response is: Video</Text>
        <Video
          ref={videoPlayerRef}
          source={{uri: response}}
          poster={response}
          resizeMode="contain"
          paused={!isVideoPlaying}
          style={dimensions}
          onProgress={handleVideoProgress}
          repeat={true}
          onLoad={handleVideoDimensions}
        />

        <View style={styles.progressView}>
          {!isVideoPlaying ? (
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
          {isVideoPlaying && (
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

export default VideoPlayer;

/**
 * This commented code is for -
 * checking different orientation, height/width
 * of videos.
 */

// import React, {useEffect, useRef, useState} from 'react';
// import {View, Text, TouchableOpacity, Animated, Dimensions} from 'react-native';
// import {Icon} from 'native-base';
// import Video from 'react-native-video';
// import styles from '../styles';

// const {height, width} = Dimensions.get('window');

// const VideoPlayer = ({item: {createdDate, response}}) => {
//   const videoPlayerRef = useRef(null); // to take ref of VideoPlayer
//   const [isVideoPlaying, setIsVideoPlaying] = useState(false);
//   // to keep track of video
//   const [videoData, setVideoData] = useState({
//     totalDuration: null,
//     presentDuration: null,
//   });
//   const progressAnimation = useRef(new Animated.Value(0)).current;
//   const [dimensions, setDimensions] = useState({height: 0, width: 0});

//   // animating progress when video starts to play
//   useEffect(() => {
//     isVideoPlaying &&
//       Animated.timing(progressAnimation, {
//         toValue: 1,
//         duration: 500,
//         useNativeDriver: true,
//       }).start();
//   }, [isVideoPlaying]);

//   // handling play/pause of video player
//   const handlePlayPauseTouch = () => {
//     setIsVideoPlaying(!isVideoPlaying);
//   };

//   // storing video progress
//   const handleVideoProgress = ({
//     currentTime,
//     playableDuration,
//     seekableDuration,
//   }) => {
//     setVideoData({
//       totalDuration: seekableDuration,
//       presentDuration: currentTime,
//     });
//   };

//   const savedAt = new Date(createdDate).toLocaleString();

//   const presentDurationInMinutes = (videoData.presentDuration / 60)
//     ?.toFixed(2)
//     .replace('.', ':');
//   const totalDurationInMinutes = (videoData.totalDuration / 60)
//     ?.toFixed(2)
//     .replace('.', ':');

//   return (
//     <View style={styles.responseContainer}>
//       <Text style={styles.savedAt}>Saved At: {savedAt}</Text>
//       <View style={styles.videoContainer}>
//         <Text style={styles.responseIs}>Response is:</Text>
//         <Video
//           ref={videoPlayerRef}
//           // source={{uri: response}}
//           source={require('../../../../AssignmentVideo3.mp4')}
//           poster={response}
//           resizeMode="cover"
//           paused={!isVideoPlaying}
//           style={dimensions}
//           onProgress={handleVideoProgress}
//           repeat={true}
//           onLoad={(response) => {
//             const {
//               width: videoWidth,
//               height: videoHeight,
//               orientation,
//             } = response.naturalSize;
//             if (orientation === 'landscape') {
//               setDimensions({height: 200, width: '100%'});
//             } else {
//               setDimensions({height: 300, width: '100%'});
//             }
//             // const heightScaled = videoHeight * (width / videoWidth);
//             // if (response.naturalSize.orientation === 'landscape') {
//             //   setDimensions({
//             //     height: heightScaled,
//             //     width: '100%', //response.naturalSize.width,
//             //   });
//             // } else {
//             //   setDimensions({
//             //     height: heightScaled,
//             //     width: '100%', //response.naturalSize.width,
//             //   });
//             // }
//           }}
//         />

//         <View style={[styles.progressView]}>
//           {!isVideoPlaying ? (
//             <TouchableOpacity onPress={handlePlayPauseTouch}>
//               <Icon
//                 type="Ionicons"
//                 name="play-sharp"
//                 style={styles.controlIcon}
//               />
//             </TouchableOpacity>
//           ) : (
//             <TouchableOpacity onPress={handlePlayPauseTouch}>
//               <Icon type="Ionicons" name="pause" style={styles.controlIcon} />
//             </TouchableOpacity>
//           )}
//           {isVideoPlaying && (
//             <Animated.View style={{opacity: progressAnimation}}>
//               {videoData.totalDuration && (
//                 <Text style={styles.responseIs}>
//                   {presentDurationInMinutes}/{totalDurationInMinutes}
//                 </Text>
//               )}
//             </Animated.View>
//           )}
//         </View>
//       </View>
//     </View>
//   );
// };

// export default VideoPlayer;
