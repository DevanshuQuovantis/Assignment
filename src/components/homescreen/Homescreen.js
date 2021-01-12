import React from 'react';
import {View, Text} from 'react-native';
import {Button} from '../common';
import styles from './styles';

const Homescreen = (props) => {
  const {navigation} = props;

  // navigating to a video player
  const handleStartCourseButton = () => {
    navigation.navigate('VideoPlayer');
  };

  return (
    <View style={styles.container}>
      <Button
        buttonTitle={'Start Course'}
        getTouchableEvent={handleStartCourseButton}
      />
      {/* <Button /> */}
    </View>
  );
};

export default Homescreen;
