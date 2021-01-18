import {Platform} from 'react-native';
import Colors from '../../constants/Theme';

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
  headingText: {
    padding: 20,
    fontWeight: 'bold',
    fontSize: 20,
    color: Colors.dark,
    alignSelf: 'center',
  },
  warningText: {
    padding: 20,
    fontSize: 20,
    alignSelf: 'center',
    color: Colors.backdrop,
    fontWeight: 'normal',
    textAlign: 'center',
    marginTop: 20,
  },
  rippleCircleContainer: {flex: 0.3, justifyContent: 'center'},
  rippleCircle: {
    height: 300,
    width: 300,
    alignSelf: 'center',
  },
  rippleText: {
    color: Colors.snow,
    top: -160,
    alignSelf: 'center',
  },
  headingContainer: {flex: 0.15, justifyContent: 'center'},
  buttonHeading: {
    flex: 0.5,
    paddingTop: 20,
    justifyContent: 'space-between',
  },
  recorder: {
    height: 90,
    width: 90,
    alignSelf: 'center',
    borderRadius: 45,
    backgroundColor: Colors.red,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveContainer: {
    flex: 0.2,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  audioIcon: {
    color: Colors.snow,
  },
};
