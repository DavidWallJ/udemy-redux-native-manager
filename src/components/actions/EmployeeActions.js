export const employeeUpdate = ({ prop, value }) => {
  return {
    type: 'employeeUpdate',
    // this is es6; these are key: value pairs
    payload: { prop, value }
  }
};
