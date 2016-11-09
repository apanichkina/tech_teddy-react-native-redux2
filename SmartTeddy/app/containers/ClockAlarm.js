import React, { Component } from 'react';

import Button from "react-native-button";
import Alarm from '../components/ClockAlarm/'
import TeddyBluetooth from '../BluetoothLib'
import { toggleAlarmActive, toggleAlarmLight, toggleAlarmSound, toggleAlarmVibro, setAlarmDays, setAlarmDay, setAlarmTime, getAlarmTime, setAlarm } from '../actions/alarm';
import { connect } from 'react-redux';
BL = TeddyBluetooth.getInstance();
var strings = {
  days: ['П','В','С','Ч','П','С','В'],
  disconnected: 'LOST',
  title: 'День & ночь'
}

class ClockAlarm extends Component {

  constructor (props) {
    super(props)
    this._handleTimePicked = this._handleTimePicked.bind(this)
    this._changeWeekDay = this._changeWeekDay.bind(this)

    this.state = {
      data: ''
    }
  }
  componentDidMount () {
      setTimeout(() => {
          this.props.getAlarmTime()
      }, 500)	;
  }

  toggleAlarm () {
    this.props.toggleAlarmActive();
    this.props.setAlarm()
  }

  toggleLight () {
    this.props.toggleAlarmLight();
    this.props.setAlarm()
  }

  toggleVibro () {
    this.props.toggleAlarmVibro();
    this.props.setAlarm()
  }

  toggleSound () {
    this.props.toggleAlarmSound();
    this.props.setAlarm()
  }
  render() {
    const { time, days, isAlarmActive, isSoundActive, isVibroActive, isLightActive} = this.props;
    var Time = time;
    Time=this.timeToString(Time);
    return (
        <Alarm
            title={strings.title}
            alarmTime={Time}
            days={days}
            data={this.state.data}
            isAlarmActive={isAlarmActive}
            isSoundActive={isSoundActive}
            isVibroActive={isVibroActive}
            isLightActive={isLightActive}
            _handleTimePicked={this._handleTimePicked}
            _changeWeekDay={this._changeWeekDay}
            toggleAlarm={() =>{this.toggleAlarm()}}
            toggleSound={() =>{this.toggleSound()}}
            toggleVibro={() =>{this.toggleVibro()}}
            toggleLight={() =>{this.toggleLight()}}
            setTime={() =>{this.setTime()}}
            />
    )
  }
  timeToString = (time) => {
    return this._checkZero(time.getHours())+':'+this._checkZero(time.getMinutes())
  };


  _checkZero = (number) => {
    return ((number < 10) ? '0' : '') + number
  };

  setTime () {
    BL.setTime()
      .then((res) => { this.setState({data: res}) })
      .catch((error) => {
          console.log('setTime')
          console.log(error)

          //E.long(error, 'setTime')
        });
  }



  _handleTimePicked (time) {
     console.log('A date has been picked: ', time)
    this.props.setAlarmTime(time)
    this.props.setAlarm()
    //this._hideDateTimePicker()
  }

  _changeWeekDay (day) {
    console.log('_changeWeekDay: '+ day);
      this.props.setAlarmDay(day);
      this.props.setAlarm()
  }

}

const mapStateToProps = (state) => {
  return {
    time: state.alarm.alarmTime,
    days: state.alarm.alarmDays,
    isAlarmActive: state.alarm.isAlarmActive,
    isSoundActive: state.alarm.isSoundActive,
    isVibroActive: state.alarm.isVibroActive,
    isLightActive: state.alarm.isLightActive
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleAlarmActive: () => dispatch(toggleAlarmActive()),
    toggleAlarmLight: () => dispatch(toggleAlarmLight()),
    toggleAlarmSound: () => dispatch(toggleAlarmSound()),
    toggleAlarmVibro: () => dispatch(toggleAlarmVibro()),
    setAlarmDays: (i) => dispatch(setAlarmDays(i)),
    setAlarmDay: (i) => dispatch(setAlarmDay(i)),
    setAlarmTime: (t) => dispatch(setAlarmTime(t)),
    setAlarm: () => dispatch(setAlarm()),
    getAlarmTime: () => dispatch(getAlarmTime())
  }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ClockAlarm)
