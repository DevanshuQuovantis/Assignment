import React from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {Homescreen} from '../components/homescreen';
import {VideoPlayer} from '../components/video-player';
import {AudioRecorder} from '../components/audio-recorder';
import {Camera} from '../components/camera';

const Stack = createStackNavigator();

function Navigator() {
  return (
    <Stack.Navigator headerMode={'none'} initialRouteName="AudioRecorder">
      <Stack.Screen name="Homescreen" component={Homescreen} />
      <Stack.Screen name="VideoPlayer" component={VideoPlayer} />
      <Stack.Screen name="Camera" component={Camera} />
      <Stack.Screen name="AudioRecorder" component={AudioRecorder} />
    </Stack.Navigator>
  );
}

export default Navigator;
