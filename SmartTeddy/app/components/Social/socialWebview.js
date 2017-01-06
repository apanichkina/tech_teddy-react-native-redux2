/**
 * Created by ihelos on 04.01.17.
 */
import React, { Component } from 'react';
import { WebView } from 'react-native';

export default class SocialWebview extends Component {
    render() {
        return (
            <WebView source={{uri: "http://207.154.202.242/api/social/vk"}}/>
        );
    }
}

SocialWebview.propTypes = {
    url:React.PropTypes.string.isRequired
};