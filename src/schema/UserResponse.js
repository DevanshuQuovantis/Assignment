export default {
  name: 'user_response',
  primaryKey: 'responseId',
  properties: {
    responseId: {type: 'int', default: 0, indexed: true},
    responseType: 'string',
    response: 'string',
    createdDate: 'date',
  },
};
