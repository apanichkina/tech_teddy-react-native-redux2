import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, List, ListItem, Button, Icon, InputGroup, Input } from 'native-base';
import {popToTop} from '../../actions/route'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
    } from 'react-native';
import { openDrawer, closeDrawer } from '../../actions/drawer';
import styles from './styles';
import myTheme from '../../themes/base-theme';
var strings = {
    days: ['П','В','С','Ч','П','С','В'],
    disconnected: 'LOST'
}
import DateTimePicker from 'react-native-modal-datetime-picker'
class ClockAlarmPresentational extends Component {
    constructor (props) {
        super(props)
        this.state = {
            isDateTimePickerVisible: false
        }

    }
    componentWillUpdate(nextProps, nextState){
        if (!nextProps.name) this.props.popToTop();
    }
    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true })

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false })

    render() {
        const {
            title,
            isAlarmActive,
            alarmTime,
            days,
            isSoundActive,
            isVibroActive,
            isLightActive,
            toggleAlarm,
            _changeWeekDay,
            toggleSound,
            toggleVibro,
            toggleLight,
            data,
            setTime,
            popRoute,
            openDrawer,
        } = this.props;
        this._handleTimePickedLocal = (time) => {
            this.props._handleTimePicked(time);
            this._hideDateTimePicker()
        };

        return (
            <Container theme={myTheme} style={styles.container}>

                <Header>
                    {/* <Button transparent onPress={popRoute}>
                        <Icon name="ios-arrow-back" />
                    </Button> */}
                    <Button transparent onPress={openDrawer}>
                        <Icon name="ios-menu" />
                    </Button>
                    <Title>Будильник</Title>
                </Header>

                <Content>
                    <View style={styles.container}>
                        <View style={styles.inline}>
                            <Text style={styles.heading}>{title}</Text>
                        </View>
                        <View style={styles.inlineH0} >
                            <TouchableOpacity onPress={this._showDateTimePicker}>
                                <Text
                                    style={[styles.time, (isAlarmActive) ? {color:myTheme.btnInfoBg } :{color:myTheme.btnDisableBg }]}>
                                    {alarmTime}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={toggleAlarm}>
                                <Image
                                    style={[styles.alarm, (isAlarmActive) ? {tintColor:myTheme.btnInfoBg } :{tintColor:myTheme.btnDisableBg }]}
                                    source={require('../../../img/ic_alarm_white_24dp.png')} />
                            </TouchableOpacity>
                        </View>
                        <DateTimePicker
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this._handleTimePickedLocal}
                            onCancel={this._hideDateTimePicker}
                            mode='time'
                            />
                        <View style={styles.inline} >
                            {days.map((day, i) =>
                                    <Text
                                        key={i}
                                        onPress={() =>_changeWeekDay(i)}
                                        style={[styles.days, (days[i]) ? {color:myTheme.btnInfoBg } :{color:myTheme.btnDisableBg }]}>
                                        {strings.days[i]}
                                    </Text>
                            )
                            }
                        </View>
                        <View style={styles.inlineH0} >
                            <TouchableOpacity onPress={toggleSound}>
                                <Image
                                    style={[styles.alarm, (isSoundActive) ? {tintColor:myTheme.btnInfoBg } :{tintColor:myTheme.btnDisableBg }]}
                                    source={require('../../../img/audiotrack_white_24dp.png')} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={toggleVibro}>
                                <Image
                                    style={[styles.alarm, (isVibroActive) ? {tintColor:myTheme.btnInfoBg } :{tintColor:myTheme.btnDisableBg }]}
                                    source={require('../../../img/vibration_white_24dp.png')} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={toggleLight}>
                                <Image
                                    style={[styles.alarm, (isLightActive) ? {tintColor:myTheme.btnInfoBg } :{tintColor:myTheme.btnDisableBg }]}
                                    source={require('../../../img/brightness_high_white_24dp.png')} />
                            </TouchableOpacity>
                        </View>
                         <Button style={{ alignSelf: 'center' }} onPress={setTime} >SYNC</Button>
                         <Text>{data}</Text>


                    </View>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
  return {
      name: state.bear.connectedBearName
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    openDrawer: () => dispatch(openDrawer()),
      popToTop: () => dispatch(popToTop())
  }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ClockAlarmPresentational);

ClockAlarmPresentational.propTypes = {
    isAlarmActive: React.PropTypes.bool,
    _handleTimePicked: React.PropTypes.func,
    title: React.PropTypes.string,
    alarmTime: React.PropTypes.string,
    days: React.PropTypes.arrayOf(React.PropTypes.bool),
    isSoundActive: React.PropTypes.bool,
    isVibroActive: React.PropTypes.bool,
    isLightActive: React.PropTypes.bool,
    toggleAlarm: React.PropTypes.func,
    _changeWeekDay: React.PropTypes.func,
    toggleSound: React.PropTypes.func,
    toggleVibro: React.PropTypes.func,
    toggleLight: React.PropTypes.func,
    data: React.PropTypes.string,
    setTime: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    openDrawer: React.PropTypes.func,
};
