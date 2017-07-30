// The Complete React Native and Redux Course, Firebase as a Data Store

import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import { employeesFetch } from '../actions';
import EmployeeListItem from './EmployeeListItem';

class EmployeeList extends Component {
  // this is an async process
  // so we need to put our ListView setup in componentWillReceiveProps and componentWillMount
  // to cover all scenarios that require data to be loaded
  componentWillMount() {
    this.props.employeesFetch();

    this.createDataSource(this.props);
  }

  // nextProps are the next set of props that this componentWillReceiveProps
  // will be rendered with
  // this.props is still the old set of props
  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }
  // employees are destructured off of what ever props are passed in
  createDataSource({ employees }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    // cloneWithRows expects an object containing an array
    // we're using objects
    this.dataSource = ds.cloneWithRows(employees);
  }

  renderRow(employee) {
    return <EmployeeListItem employee={employee} />;
  }

  render() {
    console.log(this.props);
    return (
      <ListView
        enableEmptysections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

const mapStateToProps = state => {
  // for each key:value pair run this fat arrow function
  // val is the user model; name, shirt, phone, etc.
  // we are pulling of the key for the object and putting it inside the array
  // the objects key will be assigned the new key of uid
  // uid: dkid9s8df0skdf (the old object key)

  const employees = _.map(state.employees, (val, uid) => {
    return { ...val, uid };
  });

  //
  return { employees };
};

export default connect(mapStateToProps, { employeesFetch })(EmployeeList);
