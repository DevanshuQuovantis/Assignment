const INITIAL_STATE = {
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'a': {
      return {
        ...state,
        loading: true,
      };
    }
    default:
      return state;
  }
};
