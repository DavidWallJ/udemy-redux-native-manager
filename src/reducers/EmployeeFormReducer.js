const INITIAL_STATE = {
  // these are the possible [action.payload.prop] values
  name: '',
  phone: '',
  shift: 'Monday'
};

// action.payload.prop to show up as the key we have to use []
// it's not an array
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'employeeUpdate':
      return { ...state, [action.payload.prop]: action.payload.value };
    case 'employeeCreate':
      return INITIAL_STATE;
    case 'employeeSaveSuccess':
      return INITIAL_STATE;
    default:
      return state;
  }
};
