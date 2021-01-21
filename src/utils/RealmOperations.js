import Realm from 'realm';
import {ResponseOptionTypes} from '../components/video-player';

let realm = new Realm({path: 'UserResponse.realm'});

// Add data to our realm database
export const addToDb = (data, responseId) => {
  realm.write(() => {
    realm.create('user_response', {
      responseId: responseId,
      responseType: data.responseType,
      response: data.uri,
      createdDate: new Date(),
    });
  });
};

// Gives the id, that can be inserted into the new record
export const getLastResponseId = async () => {
  let maxResponseId = await realm.objects('user_response').max('responseId');
  return maxResponseId || maxResponseId === 0 ? maxResponseId + 1 : 0;
};

// Fetching user responses
export const getData = async () => {
  const data = await realm.objects('user_response');
  return data;
};
