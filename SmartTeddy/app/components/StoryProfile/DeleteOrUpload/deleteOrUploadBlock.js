import React, { Component } from 'react';
import {  Button, Icon, Text, View, Spinner } from 'native-base';
import { Image } from 'react-native';
import styles from '../styles';

export default class DOUComponent extends Component {
  render() {
    const {
        onUploadClick,
        onDeleteClick,
        isUpload,
        isWaitingDownload,
        isDownloading
    } = this.props;

            return (
                    <Button  style={[{ margin: 6, marginLeft:0, flex:2}, isDownloading ? {borderColor:'#BDBDBD'}:null]}  bordered disabled={isDownloading || isWaitingDownload} onPress={isUpload ? onDeleteClick: onUploadClick}>
                        { isUpload ?
                            <Icon name="ios-trash" />
                            : isWaitingDownload ?
                                <Spinner color='#00897B' style={{margin:0, padding:0}}/>
                                    : <Icon name="ios-cloud-upload"  style={[isDownloading ? {color:'#BDBDBD'}:null]}  />
                        }
                    </Button>
            );




    }
}

DOUComponent.propTypes = {
    onUploadClick: React.PropTypes.func,
    onDeleteClick: React.PropTypes.func,
    isUpload: React.PropTypes.bool,
    isDownloading: React.PropTypes.bool
};