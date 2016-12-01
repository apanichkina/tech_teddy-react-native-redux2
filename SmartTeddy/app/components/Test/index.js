'use strict';

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    TextInput,
    ListView,
} from 'react-native';

import io from 'socket.io-client/dist/socket.io';
import { ReactNativeAudioStreaming } from 'react-native-audio-streaming';
import { Player } from 'react-native-audio-streaming';
import {
    RTCPeerConnection,
    RTCMediaStream,
    RTCIceCandidate,
    RTCSessionDescription,
    RTCView,
    MediaStreamTrack,
    getUserMedia,
} from 'react-native-webrtc';

const configuration = {"iceServers": [{"url": "stun:stun.l.google.com:19302"}]};

const pcPeers = {};

let container;
let socket;

const RCTWebRTCDemo = React.createClass({
    createPC: function (socketId, isOffer) {
        var configuration = {"iceServers": [{"url": "stun:stun.l.google.com:19302"}]};
        var pc = new RTCPeerConnection(configuration);
        pcPeers[socketId] = pc;

        pc.onicecandidate = function (event) {
            console.log('onicecandidate', event.candidate);
            if (event.candidate) {
                socket.emit('exchange', {'to': socketId, 'candidate': event.candidate});
            }
        };

        function createOffer() {
            pc.createOffer(function (desc) {
                console.log('createOffer', desc);
                pc.setLocalDescription(desc, function () {
                    console.log('setLocalDescription', pc.localDescription);
                    socket.emit('exchange', {'to': socketId, 'sdp': pc.localDescription});
                }, this.logError);
            }, this.logError);
        }

        pc.onnegotiationneeded = function () {
            console.log('onnegotiationneeded');
            if (isOffer) {
                createOffer();
            }
        }

        pc.oniceconnectionstatechange = function (event) {
            console.log('oniceconnectionstatechange', event.target.iceConnectionState);
            if (event.target.iceConnectionState === 'completed') {
                setTimeout(() => {
                    getStats();
                }, 1000);
            }
            if (event.target.iceConnectionState === 'connected') {
                createDataChannel();
            }
        };
        pc.onsignalingstatechange = function (event) {
            console.log('onsignalingstatechange', event.target.signalingState);
        };

        pc.onaddstream = function (event) {
            console.log('onaddstream', event.stream);
            container.setState({info: 'One peer join!'});

            const remoteList = container.state.remoteList;
            remoteList[socketId] = event.stream.toURL();
            container.setState({remoteList: remoteList});
        };
        pc.onremovestream = function (event) {
            console.log('onremovestream', event.stream);
        };

        function createDataChannel() {
            if (pc.textDataChannel) {
                return;
            }
            const dataChannel = pc.createDataChannel("text");

            dataChannel.onerror = function (error) {
                console.log("dataChannel.onerror", error);
            };

            dataChannel.onmessage = function (event) {
                console.log("dataChannel.onmessage:", event.data);
                ReactNativeAudioStreaming.play('http://storage.googleapis.com/hardteddy_stories/mp3/'+event.data+'.mp3', {});
                container.receiveTextData({user: socketId, message: event.data});
            };

            dataChannel.onopen = function () {
                console.log('dataChannel.onopen');
                container.setState({textRoomConnected: true});
            };

            dataChannel.onclose = function () {
                console.log("dataChannel.onclose");
            };

            pc.textDataChannel = dataChannel;
        }

        return pc;
    },

    join: function (roomID) {
        socket.emit('join', roomID, function (socketIds) {
            console.log('join', socketIds);
            for (const i in socketIds) {
                const socketId = socketIds[i];
                this.createPC(socketId, true);
            }
        }.bind(this));
    },

    exchange: function (data) {
        const fromId = data.from;
        let pc;
        if (fromId in pcPeers) {
            pc = pcPeers[fromId];
        } else {
            pc = this.createPC(fromId, false);
        }

        if (data.sdp) {
            console.log('exchange sdp', data);
            pc.setRemoteDescription(new RTCSessionDescription(data.sdp), function () {
                if (pc.remoteDescription.type == "offer")
                    pc.createAnswer(function (desc) {
                        console.log('createAnswer', desc);
                        pc.setLocalDescription(desc, function () {
                            console.log('setLocalDescription', pc.localDescription);
                            socket.emit('exchange', {'to': fromId, 'sdp': pc.localDescription});
                        }.bind(this), this.logError);
                    }.bind(this), this.logError);
            }.bind(this), this.logError);
        } else {
            console.log('exchange candidate', data);
            pc.addIceCandidate(new RTCIceCandidate(data.candidate));
        }
    },

    leave: function (socketId) {
        console.log('leave', socketId);
        const pc = pcPeers[socketId];
        const viewIndex = pc.viewIndex;
        pc.close();
        delete pcPeers[socketId];

        const remoteList = container.state.remoteList;
        delete remoteList[socketId]
        container.setState({remoteList: remoteList});
        container.setState({info: 'One peer leave!'});
    },


    logError: function (error) {
        console.log("logError", error);
    },

    mapHash: function (hash, func) {
        const array = [];
        for (const key in hash) {
            const obj = hash[key];
            array.push(func(obj, key));
        }
        return array;
    },

    getStats: function () {
        const pc = pcPeers[Object.keys(pcPeers)[0]];
        if (pc.getRemoteStreams()[0] && pc.getRemoteStreams()[0].getAudioTracks()[0]) {
            const track = pc.getRemoteStreams()[0].getAudioTracks()[0];
            console.log('track', track);
            pc.getStats(track, function (report) {
                console.log('getStats report', report);
            }, this.logError);
        }
    },

    getInitialState: function () {
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => true});
        return {
            info: 'Initializing',
            status: 'init',
            roomID: '',
            isFront: true,
            selfViewSrc: null,
            remoteList: {},
            textRoomConnected: false,
            textRoomData: [],
            textRoomValue: '',
        };
    },
    componentDidMount: function () {
        container = this;
        socket = io.connect('https://react-native-webrtc.herokuapp.com', {transports: ['websocket']});

        socket.on('exchange', function (data) {
            this.exchange(data);
        }.bind(this));
        socket.on('leave', function (socketId) {
            this.leave(socketId);
        }.bind(this));

        socket.on('connect', function (data) {
            console.log('connect');
            container.setState({status: 'ready', info: 'Please enter or create room ID'});
        });
    },
    _press(event) {
        this.refs.roomID.blur();
        this.setState({status: 'connect', info: 'Connecting'});
        this.join(this.state.roomID);
    },
    receiveTextData(data) {
        const textRoomData = this.state.textRoomData.slice();
        textRoomData.push(data);
        this.setState({textRoomData, textRoomValue: ''});
    },
    _textRoomPress() {
        if (!this.state.textRoomValue) {
            return
        }
        const textRoomData = this.state.textRoomData.slice();
        textRoomData.push({user: 'Me', message: this.state.textRoomValue});
        for (const key in pcPeers) {
            const pc = pcPeers[key];
            pc.textDataChannel.send(this.state.textRoomValue);
        }
        this.setState({textRoomData, textRoomValue: ''});
    },
    _renderTextRoom() {
        return (
            <View style={styles.listViewContainer}>
                <ListView
                    dataSource={this.ds.cloneWithRows(this.state.textRoomData)}
                    renderRow={rowData => <Text>{`${rowData.user}: ${rowData.message}`}</Text>}
                />
                <TextInput
                    style={{width: 200, height: 30, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={value => this.setState({textRoomValue: value})}
                    value={this.state.textRoomValue}
                />
                <TouchableHighlight
                    onPress={this._textRoomPress}>
                    <Text>Send</Text>
                </TouchableHighlight>
            </View>
        );
    },
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    {this.state.info}
                </Text>
                {this.state.textRoomConnected && this._renderTextRoom()}
                { this.state.status == 'ready' ?
                    (<View>
                        <TextInput
                            ref='roomID'
                            autoCorrect={false}
                            style={{width: 200, height: 40, borderColor: 'gray', borderWidth: 1}}
                            onChangeText={(text) => this.setState({roomID: text})}
                            value={this.state.roomID}
                        />
                        <TouchableHighlight
                            onPress={this._press}>
                            <Text>Enter room</Text>
                        </TouchableHighlight>
                    </View>) : null
                }
            </View>
        );
    }
});

const styles = StyleSheet.create({
    selfView: {
        width: 200,
        height: 150,
    },
    remoteView: {
        width: 200,
        height: 150,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    listViewContainer: {
        height: 150,
    },
});

export default RCTWebRTCDemo;