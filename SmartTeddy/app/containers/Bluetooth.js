import React, {
    Component
    } from 'react';

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Platform,
    Switch
    } from 'react-native'


import BluetoothSerial from 'react-native-bluetooth-hc05'
import {
    Buffer
    } from 'buffer'

var strings = {
    knownBears: 'Знакомые мишки',
    connectedTo: ' подключен',
    noConnection: '✗ не подключен',
    connecting: 'пытаюсь…',
    activateBT: 'Включить Bluetooth',
    title: 'Выбери медведя'
}

global.Buffer = Buffer
const iconv = require('iconv-lite')

import { connect } from 'react-redux';
import { pushNewRoute } from '../actions/route';
const Button = ({ label, onPress }) =>
    <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={{ color: '#fff' }}>{label}</Text>
    </TouchableOpacity>

class Bluetooth extends Component {
    static propTypes = {
        pushNewRoute: React.PropTypes.func
    };
    pushNewRoute(route) {
        this.props.pushNewRoute(route);
    }

    constructor (props) {
        super(props)
        this.state = {
            discovering: false,
            devices: [],
            devicesToShow: [],
            connected: false,
            incommingData: '',
            device: null
        }

        this.expectDisconnect = false;

        this.handler = this.handlerLost.bind(this)
    }

    handlerLost () {
      /* if (this.state.device) {
      Toast.showLongBottom(`BLUETOOTH: Connection to device ${this.state.device.name} has been lost`)
      } */
      if (!this.expectDisconnect) {
        ///Toast.showLongBottom(`BLUETOOTH: Connection has been lost`)
          console.log('BLUETOOTH: Connection has been lost')
      } else {
        this.expectDisconnect = false;
      }

      this.setState({ connected: false })
    }

    componentWillMount () {
        Promise.all([
            BluetoothSerial.isEnabled(),
            BluetoothSerial.list(),
            BluetoothSerial.isConnected()
        ])
            .then((values) => {
                const [ isEnabled, devices, connected ] = values
                this.setState({ isEnabled, devices, connected })
            })

        if (global.device) {
            this.setState({device: global.device});
        }

        BluetoothSerial.on('bluetoothEnabled', () => {
            //Toast.showLongBottom('Bluetooth enabled')
            //this.enableBluetooth();
            console.log('Bluetooth enabled')
            Promise.all([
                BluetoothSerial.isEnabled(),
                BluetoothSerial.list()
            ])
                .then((values) => {
                    const [ isEnabled, devices ] = values
                    this.setState({ isEnabled, devices })
                })
        })

        BluetoothSerial.on('bluetoothDisabled', () => {
            //this.disableBluetooth();
            console.log('Bluetooth disabled')
            //Toast.showLongBottom('Bluetooth disabled')
        })

        BluetoothSerial.on('connectionLost', this.handler)

        /* BluetoothSerial.on('data', (data) => {
         // Toast.showLongBottom(`data received`)
         BluetoothSerial.read()
         .then((res) => {
         this.setState({ incommingData: res })
         })
         .catch((err) => {
         Toast.showLongBottom(err)
         })
         }) */
    }

    componentWillUnmount () {
      BluetoothSerial.off('connectionLost', this.handler)
      this.disconnect();
      // BluetoothSerial.on('bluetoothEnabled', () => {})
      // BluetoothSerial.on('bluetoothDisabled', () => {})
      // BluetoothSerial.on('connectionLost', () => {})
    }

    enable () {
        BluetoothSerial.enable()
            .then((res) => this.setState({ isEnabled: true }))
            .catch((err) => {
                comsole.log(err)
                //Toast.showLongBottom(err)
            })
    }

    disable () {
        this.expectDisconnect = true;
        BluetoothSerial.disable()
            .then((res) => this.setState({ isEnabled: false }))
            .catch((err) => {console.log(err);
            //Toast.showLongBottom(err)
            })
    }

    toggleBluetooth (value) {
        if (value === true) {
            this.enable()
        } else {
            this.disable()
        }
    }

    discoverUnpaired () {
        if (this.state.discovering) {
            return false
        } else {
            this.setState({ discovering: true })
            BluetoothSerial.discoverUnpairedDevices()
                .then((unpairedDevices) => {
                    const devices = this.state.devices
                    const deviceIds = devices.map((d) => d.id)
                    unpairedDevices.forEach((device) => {
                        if (deviceIds.indexOf(device.id) < 0) {
                            devices.push(device)
                        }
                    })
                    this.setState({ devices, discovering: false })
                })
        }
    }

    subscribe () {
        BluetoothSerial.subscribe('\n')
            .then((res) => {})
            .catch((err) => {})
    }

    unsubscribe () {
        BluetoothSerial.unsubscribe()
            .then((res) => {})
            .catch((err) => {})
    }

    /**
     * Connect to bluetooth device by id
     * @param  {Object} device
     */
    connect (device) {
        this.setState({ connecting: true })
        BluetoothSerial.connect(device.id)
            .then((res) => {
                //Toast.showLongBottom(`Connected to device ${device.name}`)
                console.log('Connected to device'+device.name)
                //this.subscribe();

                /* devicesToShow = devicesToShow.filter(function(item) {
                 return item.id !== device.id;
                 }); */
                this.setState({ device, connected: true, connecting: false })
                global.device = device;
                this.pushNewRoute('bluetooth-story')
            })
            .catch((err) => {
                this.setState({ connected: false, connecting: false })
            })
    }

    /**
     * Disconnect from bluetooth device
     */
    disconnect () {
      BluetoothSerial.disconnect()
          .then(() => {

              // this.setState({ connected: false })
              // this.unsubscribe();
          })
          .catch((err) => {
              console.log(err);
              //Toast.showLongBottom(err)
          })
    }

    /**
     * Toggle connection when we have active device
     * @param  {Boolean} value
     */
    toggleConnect (value) {
        if (value === true && this.state.device) {
            this.connect(this.state.device)
        } else {
            this.disconnect()
        }
    }

    isConnected () {
        BluetoothSerial.isConnected()
        .then((d) => { this.setState({connected: d})})
        .catch((err) => {
                consile.log(err)
                //Toast.showLongBottom(err)
            })
    }

    /**
     * Write message to device
     * @param  {String} message
     */
    write (message) {
        if (!this.state.connected) {
            console.log('You must connect to device first')
            //Toast.showLongBottom('You must connect to device first')
            return
        }

        BluetoothSerial.write(message)
            .then((res) => {
                this.setState({ connected: true })
            })
            .catch((err) =>{
                consile.log(err)
                //Toast.showLongBottom(err)
            })

    }

    writePackets (message, packetSize = 64) {
        const toWrite = iconv.encode(message, 'cp852')
        const writePromises = []
        const packetCount = Math.ceil(toWrite.length / packetSize)

        for (var i = 0; i < packetCount; i++) {
            const packet = new Buffer(packetSize)
            packet.fill(' ')
            toWrite.copy(packet, 0, i * packetSize, (i + 1) * packetSize)
            writePromises.push(BluetoothSerial.write(packet))
        }

        Promise.all(writePromises)
            .then((result) => {
            })
    }

    render () {
        const { bluetoothEnabled } = this.props;
        console.log(bluetoothEnabled);
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>{strings.title}</Text>
                <View style={{ backgroundColor: '#eee' }}>
                    {Platform.OS === 'android'
                        ? (
                        <View style={styles.enableInfoWrapper}>
                            <Text style={{ fontWeight: 'bold' }}>{strings.activateBT}</Text>
                            <Switch
                                onValueChange={this.toggleBluetooth.bind(this)}
                                value={bluetoothEnabled} />
                        </View>
                    ) : null}
                </View>

                <View style={styles.connectionInfoWrapper}>
                    <View>
                        <Switch
                            onValueChange={this.toggleConnect.bind(this)}
                            disabled={!this.state.device}
                            value={this.state.connected || this.state.connecting} />
                    </View>
                    <View>
                        {this.state.connected
                            ? (
                            <Text style={styles.connectionInfo}>
                                ✓ {this.state.device.name} {strings.connectedTo}
                            </Text>
                        ) : this.state.connecting ? (
                            <Text style={[styles.connectionInfo, { color: '#ff6523' }]}>
                                {strings.connecting}
                            </Text>
                        ) : (
                            <Text style={[styles.connectionInfo, { color: '#ff6523' }]}>
                                {strings.noConnection}
                            </Text>
                        )}
                    </View>
                </View>
                <Text style={styles.listTitle}>{strings.knownBears}</Text>
                <View style={styles.listContainer}>
                    {this.state.devices.map((device, i) => {
                        if (device.name.startsWith('HC-')) {
                            return (
                                <TouchableOpacity key={`${device.id}_${i}`} style={styles.listItem} onPress={this.connect.bind(this, device)}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{ fontWeight: 'bold' }}>{device.name}</Text>
                                        <Text>{`<${device.id}>`}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }
                    })}
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    {/* {Platform.OS === 'android'
                     ? (
                     <Button
                     label={this.state.discovering ? '... Discovering' : 'Discover devices'}
                     onPress={this.discoverUnpaired.bind(this)} />
                     ) : null} */}
                    {/* <Button
                     label='Write to device'
                     onPress={this.write.bind(this, 'test')} /> */}
                </View>

            </View>
        )
    }

}

const mapStateToProps = (state,ownProps) => {
    return {
        bluetoothEnabled: state.bluetooth.bluetoothEnabled
    }
};
const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        pushNewRoute: route => dispatch(pushNewRoute(route))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Bluetooth)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        backgroundColor: '#ffffff',
        padding: 0
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 24,
        marginVertical: 10,
        alignSelf: 'center'
    },
    enableInfoWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 40,
        paddingHorizontal: 25,
        alignItems: 'center'
    },
    connectionInfoWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 25
    },
    connectionInfo: {
        fontWeight: 'bold',
        alignSelf: 'center',
        fontSize: 18,
        marginVertical: 10,
        color: '#238923'
    },
    listContainer: {
        marginTop: 5,
        borderColor: '#ccc',
        borderTopWidth: 0.5
    },
    listTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        paddingHorizontal: 25,
        borderColor: '#ccc',
        borderTopWidth: 0.5
    },
    listItem: {
        flex: 1,
        padding: 25,
        borderColor: '#ccc',
        borderBottomWidth: 0.5
    },
    button: {
        margin: 5,
        padding: 25,
        backgroundColor: '#4C4C4C'
    }
});
