import {Dimensions} from 'react-native';
import Colors from '../../constants/Theme';

const {height} = Dimensions.get('screen');

export default {
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: Platform.OS === 'android' ? 'center' : 'flex-end',
    height: Platform.OS === 'android' ? 50 : 80,
    padding: 10,
    backgroundColor: Colors.blue,
  },
  backIcon: {
    color: Colors.snow,
    fontSize: 20,
    marginBottom: Platform.OS === 'ios' ? 3 : 0,
  },
  back: {color: Colors.snow, fontSize: 18, paddingLeft: 10, marginBottom: 2},
  seperator: {borderWidth: 0.5, borderColor: Colors.backdrop},
  responseContainer: {
    margin: 10,
    padding: 10,
  },
  videoContainer: {
    backgroundColor: Colors.blue,
  },

  textContainer: {
    borderRadius: 5,
    padding: 10,
    backgroundColor: Colors.blue,
  },
  textResponse: {
    fontSize: 16,
    color: Colors.snow,
    marginTop: 20,
    paddingLeft: 10,
  },

  controlIcon: {color: Colors.snow, marginLeft: -4},
  responseIs: {color: Colors.snow, fontSize: 16, padding: 10},
  savedAt: {marginVertical: 10, fontSize: 18, color: Colors.darkBlue},
  progressView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
};
