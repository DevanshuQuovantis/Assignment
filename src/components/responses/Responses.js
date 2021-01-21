import React from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {Icon} from 'native-base';
import {ResponseOptionTypes} from '../video-player';
import AudioPlayer from './AudioPlayer';
import VideoPlayer from './VideoPlayer';
import styles from './styles';

const Responses = (props) => {
  const {navigation, route} = props;

  // navigation to its previous page
  const handleBackButton = () => {
    navigation.goBack();
  };

  // rendering based upon the response type
  const renderItem = ({item}) => {
    const {createdDate, responseType, response} = item;
    switch (responseType) {
      case ResponseOptionTypes.VIDEO_RESPONSE_OPTION: {
        return <VideoPlayer item={item} />;
      }
      case ResponseOptionTypes.AUDIO_RESPONSE_OPTION: {
        return <AudioPlayer item={item} />;
      }
      case ResponseOptionTypes.TEXT_RESPONSE_OPTION: {
        const savedAt = new Date(createdDate).toLocaleString();
        return (
          <View style={styles.responseContainer}>
            <Text style={styles.savedAt}>Saved At: {savedAt}</Text>
            <View style={styles.videoContainer}>
              <Text style={styles.responseIs}>Response is: Text</Text>
              <Text style={[styles.textResponse, {paddingBottom: 10}]}>
                {response}
              </Text>
            </View>
          </View>
        );
      }
      default:
        return null;
    }
  };

  const responses = JSON.parse(route.params.userResponses);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.headerContainer}
        onPress={handleBackButton}>
        <Icon type="AntDesign" name="left" style={styles.backIcon} />
        <Text style={styles.back}>Back</Text>
      </TouchableOpacity>
      <FlatList
        data={responses}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <View style={styles.seperator} />}
      />
    </View>
  );
};

export default Responses;
