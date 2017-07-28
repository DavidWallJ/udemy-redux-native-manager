import React, { Component } from 'react';
import { Picker, Text } from 'react-native';
import { connect } from 'react-redux';
import { employeeUpdate } from './actions';
import { Card, CardSection, Input, Button} from './common';

class EmployeeCreate extends Component {
  renderPickerItems() {
    const days = [
      'Monday', 'Tuesday', 'Wednesday',
      'Thursday', 'Friday', 'Saturday', 'Sunday'
    ];
    return days.map((day) => <Picker.Item key={day} label={day} value={day} />);
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Name"
            placeholder="Jane"
            value={this.props.name}
            onChangeText={value => this.props.employeeUpdate({ prop: 'name', value })}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Phone"
            placeholder="555-555-5555"
            value={this.props.phone}
            onChangeText={value => this.props.employeeUpdate({ prop: 'phone', value })}
          />
        </CardSection>

        <CardSection style={{ flexDirection: 'column'}}>
        <Text style={styles.pickerLabelStyle}>Select a shift</Text>
          <Picker
            selectedValue={this.props.shift}
            onValueChange={value => this.props.employeeUpdate({ prop: 'shift', value })}
          >
            {this.renderPickerItems()}
          </Picker>
        </CardSection>

        <CardSection>
          <Button>
            Create
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  pickerLabelStyle: {
    fontSize: 18,
    paddingLeft: 20
  }
}

// 'employeeForm' coming from combineReducers in reducers/index.js
const mapStateToProps = (state) => {
  const { name, phone, shift } = state.employeeForm;

  return { name, phone, shift }
};

export default connect(mapStateToProps, { employeeUpdate })(EmployeeCreate);
