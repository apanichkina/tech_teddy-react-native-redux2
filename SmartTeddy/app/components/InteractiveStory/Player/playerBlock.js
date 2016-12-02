import React, { Component } from 'react';
import {  Button, Icon, Text, View } from 'native-base';
import { Image } from 'react-native';
import styles from '../styles';

export default class PlayerComponent extends Component {
    play(){
        console.log('----------------play')
    }
  render() {
    const {
        onPlay,
        isPlaying,
        onPause,
        isPaused,
    } = this.props;
    return (
                <View style={{ flexDirection:'row'}}>
                    {!isPlaying ?
                            <Button info style={{ margin: 6, marginLeft:0, flex:1}} onPress={onPlay}>
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
                        {/* <SliderContainer caption=''>
                         <Slider
                         value={sliderVal}
                         onValueChange={(value) => sliderVal={value}}
                         style={styles.slider_container}
                         trackStyle={styles.track}
                         thumbStyle={styles.thumb}
                         minimumTrackTintColor='#B39DDB'
                         thumbTouchSize={{width: 50, height: 40}}
                         />
                         </SliderContainer>  */}
                    </View>

                </View>
    );
  }
}

PlayerComponent.propTypes = {
    onPlay: React.PropTypes.func,
    onPause: React.PropTypes.func,
    isPlaying: React.PropTypes.bool,
    isPaused: React.PropTypes.bool
};