/**
 * Created by ihelos on 06.01.17.
 */
import React, { Component } from 'react';
import { View, TouchableHighlight, Image } from 'react-native';
import { popRoute, pushNewRoute } from '../../actions/route';
import { connect } from 'react-redux';
import styles from './styles';

export default class SocialButtons extends Component {
    render() {
        return (
            <View style={styles.content}>
            <TouchableHighlight underlayColor="white" onPress={this.props.VKEvent}>
                <Image
                    style={styles.button}
                    source={require('../../../img/social/vk.png')}
                />
            </TouchableHighlight>
                <TouchableHighlight underlayColor="white" onPress={this.props.FBEvent}>
                    <Image
                        style={styles.button}
                        source={require('../../../img/social/fb.png')}
                    />
                </TouchableHighlight>
                <TouchableHighlight underlayColor="white" onPress={this.props.OKEvent}>
                    <Image
                        style={styles.button}
                        source={require('../../../img/social/ok.png')}
                    />
                </TouchableHighlight>
            </View>
        );
    }
}
SocialButtons.propTypes = {
    VKEvent: React.PropTypes.func.isRequired,
    FBEvent: React.PropTypes.func.isRequired,
    OKEvent: React.PropTypes.func.isRequired,
};