import React, { Component } from 'react';


//import DateTimePicker from 'react-native-modal-datetime-picker'
//import Toast from '@remobile/react-native-toast'
import Button from "react-native-button";
// import BluetoothSerial from 'react-native-bluetooth-hc05'
import Alarm from '../components/ClockAlarm/'
import TeddyBluetooth from '../BluetoothLib'
//import ToastError from './ToastError'
//var E = new ToastError('ClockAlarm')
BL = TeddyBluetooth.getInstance();
var strings = {
  days: ['П','В','С','Ч','П','С','В'],
  disconnected: 'LOST',
  title: 'День & ночь'
}

export default class ClockAlarm extends Component {

  constructor (props) {
    super(props)
    this._handleTimePicked = this._handleTimePicked.bind(this)
    this._changeWeekDay = this._changeWeekDay.bind(this)
    this.alarm = {
      days: [false, false, false, false, false, false, false],
      active: false,
      time: new Date(),
      lightActive: false,
      vibroActive: false,
      soundActive: false
    }

    this.state = {
      incommingData: '',
      connected: true,
      device: props.device,
      end: false,
      isRefreshing: false,
      isDateTimePickerVisible: false,
      timeHHMM: '00:00',
      time: this.alarm.time,
      days: this.alarm.days,
      alarmActive: this.alarm.active,
      lightActive: this.alarm.lightActive,
      vibroActive: this.alarm.vibroActive,
      soundActive: this.alarm.soundActive,
      data: ''
    }

  }
  render() {
    return (
        <Alarm
            title={strings.title}
            alarmTime={this.state.timeHHMM}
            days={this.state.days}
            data={this.state.data}
            isAlarmActive={this.state.alarmActive}
            isSoundActive={this.state.soundActive}
            isVibroActive={this.state.vibroActive}
            isLightActive={this.state.lightActive}
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


  timeToString (time) {
    return this._checkZero(time.getHours())+':'+this._checkZero(time.getMinutes())
  }



  _checkZero (number) {
    return ((number < 10) ? '0' : '') + number
  }

  toggleAlarm () {
    this.alarm.active = !this.state.alarmActive
    this.setState({ alarmActive: this.alarm.active })
    this.setAlarm()
  }

  toggleLight () {
    this.alarm.lightActive = !this.state.lightActive
    this.setState({ lightActive: this.alarm.lightActive })
    this.setAlarm()
  }

  toggleVibro () {
    this.alarm.vibroActive = !this.state.vibroActive
    this.setState({ vibroActive: this.alarm.vibroActive })
    this.setAlarm()
  }

  toggleSound () {
    this.alarm.soundActive = !this.state.soundActive
    this.setState({ soundActive: this.alarm.soundActive })
    this.setAlarm()
  }

  getAlarmTime () {
    BL.getAlarmTime()
      .then((res) => { this.parseTime(res) })
      .catch((error) => {
          console.log('getAlarmTime')
          console.log(error)

          // E.long(error, 'getAlarmTime')
         });
  }

  parseTime (res) {
    var d = res.charCodeAt(2)
    var days = []
    this.alarm.time.setHours(res.charCodeAt(0), res.charCodeAt(1))
    var active = res.charCodeAt(3)

    for (var i = 0; i < 7; ++i) {
      this.alarm.days[i] = (d >> i) & 0x01
    }

    this.alarm.active = ((active >> 3) & 0x01)
    this.alarm.lightActive = ((active >> 0) & 0x01)
    this.alarm.vibroActive = ((active >> 1) & 0x01)
    this.alarm.soundActive = ((active >> 2) & 0x01)

    this.setState({
      time: this.alarm.time,
      timeHHMM: this.timeToString(this.alarm.time),
      days: this.alarm.days,
      lightActive: this.alarm.lightActive,
      vibroActive: this.alarm.vibroActive,
      soundActive: this.alarm.soundActive,
      alarmActive: this.alarm.active
    })
  }

  setAlarm () {

    var activate = {
      clock: this.alarm.active,
      lightActive: this.alarm.lightActive,
      vibroActive: this.alarm.vibroActive,
      soundActive: this.alarm.soundActive
    }

    BL.setAlarm(this.alarm.time, this.alarm.days, activate)
      .then((res) => { this.parseTime(res) })
      .catch((error) => {
          console.log('setAlarm')
          console.log(error)
          //E.long(error, 'setAlarm')
        });
  }

  setTime () {
    BL.setTime()
      .then((res) => { this.setState({data: res}) })
      .catch((error) => {
          console.log('setTime')
          console.log(error)

          //E.long(error, 'setTime')
        });
  }

  componentWillMount () {
  }

  componentDidMount () {
    setTimeout(this.getAlarmTime.bind(this), 500);
  }

  componentWillUnmount () {
  }

  _handleTimePicked (time) {
     console.log('A date has been picked: ', time)
    this.alarm.time = time
    this.setState({time: this.alarm.time})
    this.setAlarm()
    //this._hideDateTimePicker()
  }

  _changeWeekDay (day) {
    console.log('_changeWeekDay: '+ day)
    var d = this.state.days
    d[day] = !d[day]
    this.setState({days: d})
    this.alarm.days = d;
    this.setAlarm()
  }

}
