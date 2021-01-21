import React, {useEffect, useState, useCallback} from 'react';
import {View, StatusBar, Platform} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Realm from 'realm';
import {Button} from '../common';
import {getData} from '../../utils/RealmOperations';
import UserResponse from '../../schema/UserResponse';
import Colors from '../../constants/Theme';
import styles from './styles';
let realm;

const Homescreen = (props) => {
  const [userResponses, setUserResponse] = useState([]);
  const {navigation} = props;

  /**
   * Realm database object
   */
  useEffect(() => {
    realm = new Realm({
      path: 'UserResponse.realm',
      schema: [UserResponse],
    });
    Platform.OS === 'android' && StatusBar.setBackgroundColor(Colors.blue);
  }, []);

  /**
   * This hook is called -
   * so as to know, when our homescreen is in focus
   * & when to get data from the database about user responses
   */
  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        const userResponse = await getData();
        setUserResponse(userResponse);
      })();
    }, []),
  );

  // navigating to a video player
  const handleStartCourseButton = () => {
    navigation.navigate('VideoPlayer');
  };

  // handling user responses navigation
  const handleUserResponse = () => {
    navigation.navigate('Responses', {
      userResponses: JSON.stringify(userResponses),
    });
  };

  return (
    <View style={styles.container}>
      <Button
        buttonTitle={'Start Course'}
        getTouchableEvent={handleStartCourseButton}
      />
      <View style={{height: 20}} />
      {userResponses.length > 0 && (
        <Button
          buttonTitle={'View Responses'}
          getTouchableEvent={handleUserResponse}
        />
      )}
    </View>
  );
};

export default Homescreen;
