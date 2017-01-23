import React, { Component } from 'react';
import {  Button, Icon, Text, View, Spinner } from 'native-base';
import { Image } from 'react-native';
import styles from '../styles';
import myTheme from '../../../themes/base-theme.js';
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
                <View theme={myTheme} style={{ flexDirection:'row'}}>
                    {!isPlaying ?
                            <Button info disabled={playWaiting} style={{ flex:2, margin: 6, marginHorizontal:0}} onPress={onPlay}>
                                {playFetching && isFetchHere?
                                    <Spinner color='#fff' style={{margin:0, padding:0}}/>
                                    : <Icon name="ios-play" style={{ color: '#fff', margin: 5 }}/>
                                }
                            </Button>
                            : isPaused ?
                                <Button style={{ flex:2, margin: 6, marginHorizontal:0}} onPress={onPause}>
                                    <Icon  name="ios-play" style={{ color: '#fff', margin: 5 }}/>
                                </Button>
                                    :<Button style={{ flex:2, margin: 6, marginHorizontal:0}} onPress={onPause}>
                                        <Icon name='ios-pause' style={{ color: '#fff', margin: 5 }}/>
                                    </Button>
                    }
                    {/*
                        <View style={{flex:1}}>
                        {playFetching && isFetchHere?
                            null
                            : null
                        }
                        </View>
                        */}


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