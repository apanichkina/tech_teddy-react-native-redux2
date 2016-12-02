import React, { Component } from 'react';
import {  Button, Icon, Text, View, Spinner } from 'native-base';
import { Image } from 'react-native';
import styles from '../styles';

export default class PlayerComponent extends Component {

  render() {
    const {
        onPlay,
        isPlaying,
        onPause,
        isPaused,
        playWaiting,
        playFetching,
        isFetchHere
    } = this.props;
    return (
                <View style={{ flexDirection:'row'}}>
                    {!isPlaying ?
                            <Button info disabled={playWaiting} style={{ margin: 6, marginLeft:0, flex:1}} onPress={onPlay}>
                                <Icon name="ios-play" style={{ color: '#fff', margin: 5 }}/>
                            </Button>
                            : isPaused ?
                                <Button style={{ margin: 6, marginLeft:0, flex:1}} onPress={onPause}>
                                    <Icon  name="ios-play" style={{ color: '#fff', margin: 5 }}/>
                                </Button>
                                    :<Button style={{ margin: 6, marginLeft:0, flex:1}} onPress={onPause}>
                                        <Icon name='ios-pause' style={{ color: '#fff', margin: 5 }}/>
                                    </Button>
                    }

                    <View style={{flex:7}}>
                        {playFetching && isFetchHere?
                            <Spinner/>
                            : null
                        }
                    </View>

                </View>
    );
  }
}

PlayerComponent.propTypes = {
    onPlay: React.PropTypes.func,
    onPause: React.PropTypes.func,
    isPlaying: React.PropTypes.bool,
    isPaused: React.PropTypes.bool,
    playWaiting: React.PropTypes.bool,
    playFetching: React.PropTypes.bool,
    isFetchHere: React.PropTypes.bool
};