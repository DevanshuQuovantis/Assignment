import Colors from '../../constants/Theme';

export default {
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  capture: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: Colors.blue,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rotate: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: Colors.blue,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  icon: {
    color: Colors.snow,
  },
  rotateIcon: {
    color: Colors.snow,
    fontSize: 14,
  },
};
