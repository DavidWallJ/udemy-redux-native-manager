const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  error: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case 'emailChanged':
      return { ...state, email: action.payload };
    case 'passwordChanged':
      return { ...state, password: action.payload };
    case 'loginUser':
      return { ...state, loading: true, error: '' };
    case 'loginUserSuccess':
      // the payload here is the user login info returned from firebase
      // ...INITIAL_STATE resets everthing back to default
      return { ...state, ...INITIAL_STATE, user: action.payload,
      };
    case 'loginUserFail':
      return { ...state, error: 'Authentication Failed', password: '', loading: false };
    default:
      return state;
  }
};
