import React, { Component } from 'react';
import {  Button, Icon, Text, View } from 'native-base';
import { Image } from 'react-native';
import styles from '../styles';

export default class DOUComponent extends Component {
  render() {
    const {
        onUploadClick,
        onDeleteClick,
    } = this.props;

          return (
              <Button  style={{ margin: 6, marginLeft:0, flex:2}} bordered onPress={onUploadClick}>
                             <Icon name="ios-cloud-upload" />
                      </Button>
          );
    }
}

DOUComponent.propTypes = {
    onUploadClick: React.PropTypes.func,
    onDeleteClick: React.PropTypes.func,
};