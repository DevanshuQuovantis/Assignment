import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import Colors from '../../constants/Theme';

const Button = (props) => {
  const {buttonTitle, getTouchableEvent} = props;
  return (
    <TouchableOpacity style={styles.button} onPress={getTouchableEvent}>
      <Text style={styles.buttonTitle}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 6,
    backgroundColor: Colors.blue,
  },
  buttonTitle: {
    color: Colors.snow,
    fontSize: 16,
  },
});

export default Button;
