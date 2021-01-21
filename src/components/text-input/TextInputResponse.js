import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Keyboard} from 'react-native';
import {Icon} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {addToDb, getLastResponseId} from '../../utils/RealmOperations';
import {Button} from '../common';
import {ResponseOptionTypes} from '../video-player';
import styles from './styles';

const TextInputResponse = (props) => {
  const {navigation} = props;
  const [responseText, setResponseText] = useState(null);

  // navigation to its previous page
  const handleBackButton = () => {
    navigation.goBack();
  };

  // handling text input
  const handleTextInput = (text) => {
    setResponseText(text);
  };

  /**
   * handling save button
   * saving response in realm database
   * */
  const handleSave = async () => {
    Keyboard.dismiss();
    if (responseText && responseText.trim()) {
      const id = await getLastResponseId();
      const data = {
        uri: responseText,
        responseType: ResponseOptionTypes.TEXT_RESPONSE_OPTION,
      };
      addToDb(data, id);
      navigation.goBack();
    }
  };

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        style={styles.headerContainer}
        onPress={handleBackButton}>
        <Icon type="AntDesign" name="left" style={styles.backIcon} />
        <Text style={styles.back}>Back</Text>
      </TouchableOpacity>
      <KeyboardAwareScrollView
        contentContainerStyle={{flexGrow: 1}}
        extraHeight={0}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>
            What's your reason for being here?
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            multiline={true}
            placeholder={'Start writing here'}
            style={styles.input}
            textAlignVertical={'top'}
            onChangeText={handleTextInput}
            returnKeyType={'done'}
          />
        </View>
        <View style={styles.saveContainer}>
          <Button buttonTitle={'Save'} getTouchableEvent={handleSave} />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default TextInputResponse;
