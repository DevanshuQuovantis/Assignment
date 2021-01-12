import React from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {Homescreen} from '../components/homescreen';
import {VideoPlayer} from '../components/video-player';

const Stack = createStackNavigator();

function Navigator() {
  return (
    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen name="Homescreen" component={Homescreen} />
      <Stack.Screen name="VideoPlayer" component={VideoPlayer} />
    </Stack.Navigator>
  );
}

export default Navigator;
