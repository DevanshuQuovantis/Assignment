import Realm from 'realm';
import {addToDb, getData, getLastResponseId} from './RealmOperations';
import UserResponse from '../schema/UserResponse';

let realm;

describe('addToDb function', async () => {
  test('Checking', async () => {
    realm = new Realm({
      path: 'UserResponse.realm',
      schema: [UserResponse],
    });
    const id = await getLastResponseId();
    const input = {uri: '', responseType: 'audio'};
    expect(addToDb(input, id)).toEqual();
  });
});

describe('getData function', async () => {
  test('Checking', async () => {
    realm = new Realm({
      path: 'UserResponse.realm',
      schema: [UserResponse],
    });
    expect(await getData()).toEqual();
  });
});
