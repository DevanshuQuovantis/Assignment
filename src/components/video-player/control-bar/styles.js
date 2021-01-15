import {Platform} from 'react-native';
import Colors from '../../../constants/Theme';

export default {
  container: {
    flex: 1,
  },
  modalContainer: {margin: 0, flex: 1},
  videoControlContainer: {
    height: 120,
    paddingHorizontal: 10,
    backgroundColor: Colors.blue,
  },
  controlView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  seekControl: {
    flex: 0.4,
    justifyContent: 'center',
  },
  playPauseContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    padding: 10,
    borderRadius: 30,
    backgroundColor: Colors.darkBlue,
  },
  playContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    padding: 10,
    borderRadius: 30,
    backgroundColor: Colors.darkBlue,
  },
  controlIcon: {color: Colors.snow},
  backIcon: {color: Colors.snow, fontSize: 20},
  back: {color: Colors.snow, fontSize: 18, paddingLeft: 10, marginBottom: 2},
  headerContainer: {
    justifyContent: 'flex-end',
    height: Platform.OS === 'android' ? 50 : 80,
    padding: 10,
    backgroundColor: Colors.blue,
  },
  headerView: {flexDirection: 'row', alignItems: 'center'},
};
