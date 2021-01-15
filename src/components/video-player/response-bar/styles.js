import {Platform} from 'react-native';
import Colors from '../../../constants/Theme';

export default {
  videoControlContainer: {
    height: 120,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionContainer: {
    height: 100,
    width: 100,
    borderRadius: 10,
    backgroundColor: Colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    color: Colors.snow,
    fontSize: 18,
    marginTop: 10,
  },
  optionIcon: {color: Colors.snow, fontSize: 30},
  backIcon: {color: Colors.snow, fontSize: 22},
  headerContainer: {
    justifyContent: 'flex-end',
    height: Platform.OS === 'android' ? 50 : 80,
    padding: 10,
  },
  textContainer: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.snow,
    textAlign: 'center',
  },
};
