const INITIAL_STATE = {
  email: '',
  password: ''
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case 'emailChanged':
      return { ...state, email: action.payload };
    case 'passwordChanged':
      return { ...state, password: action.payload };
    default:
      return state;
  }
};
