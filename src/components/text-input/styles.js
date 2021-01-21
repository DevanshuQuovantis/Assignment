import {Dimensions} from 'react-native';
import Colors from '../../constants/Theme';

const {height} = Dimensions.get('screen');

export default {
  container: {
    flexGrow: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: Platform.OS === 'android' ? 'center' : 'flex-end',
    height: Platform.OS === 'android' ? 40 : 80,
    padding: 10,
    backgroundColor: Colors.blue,
  },
  backIcon: {
    color: Colors.snow,
    fontSize: 20,
    marginBottom: Platform.OS === 'ios' ? 3 : 0,
  },
  back: {color: Colors.snow, fontSize: 18, paddingLeft: 10, marginBottom: 2},
  headingContainer: {flex: 0.1, justifyContent: 'center'},
  headingText: {
    padding: 20,
    fontWeight: 'bold',
    fontSize: 20,
    color: Colors.dark,
    alignSelf: 'center',
  },
  inputContainer: {
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.backdrop,
  },
  input: {fontSize: 16, height: (380 / 667) * height},
  saveContainer: {
    position: 'absolute',
    bottom: 20,
    paddingHorizontal: 20,
    width: '100%',
  },
};
