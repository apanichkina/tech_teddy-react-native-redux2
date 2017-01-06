import React, { Component } from 'react';
import {  Button, Icon, Card, CardItem, Text, View } from 'native-base';
import { Image } from 'react-native';
import styles from './styles';
import Player from './Player'
import DeleteOrUpload from './DeleteOrUpload'
import Upload from './Upload'
import {
    MKProgress,
    } from 'react-native-material-kit';
const illustration_default = require('../../../img/no-image-box.png');
export default class StoryCard extends Component {

  render() {
    const {
        name,
        img_urls,
        description,
        onBuyClick,
        isUpload,
        isBought,
        logo,
        isConnected,
        onConnectBear,
        downloaded,
        isDownloading,
        id,
        category,
        goToInteractive,
        duration_splitted
    } = this.props;
    return (
        <Card style={[styles.mb, { flex: 0 }]}>

            <CardItem>
                <Icon name={logo}/>
                <Text>{name.toUpperCase()}</Text>
            </CardItem>

            <CardItem cardBody >
                <Image style={{ resizeMode: 'cover', width: null}} defaultSource={illustration_default} source={{uri: img_urls.large}}/>
                <View>
                    {isDownloading ?
                        <MKProgress
                            style={{ marginTop: 6}}
                            buffer={1}
                            progressColor="#00897B"
                            bufferColor="#B2DFDB"
                            progress={downloaded}
                            />
                        : null
                    }
                </View>
                <View>
                    {isConnected && isUpload ?
                        category !== 'РОЛЕВЫЕ' ?
                        <Player storyId={id+''}/>
                            : <Button block info onPress={goToInteractive}>
                                К ИНТЕРАКТИВНОЙ СКАЗКЕ
                              </Button>
                        : null
                    }
                </View>

                <View style={{ flexDirection:'row'  }}>
                    {!isBought ?
                        <Button style={{ margin: 6, marginLeft:0, flex: 2}}
                                onPress={onBuyClick}>
                            <Icon name="ios-star" />
                            <Text style={{ color: '#fff'}}>В ИЗБРАННОЕ</Text>
                        </Button>
                        :  !isConnected ?
                            <Button info style={{ margin: 6, marginLeft:0, flex:2}} onPress={onConnectBear}>
                                ПРИМЕДВЕДИТЬСЯ
                            </Button>
                        : <DeleteOrUpload storyId={id}/>
                    }

                    <Button bordered  style={{ margin: 6, marginLeft:0, marginRight:0, flex: 2}} >
                        <Icon name="ios-share-alt" />
                        <Text>ПОДЕЛИТЬСЯ</Text>
                    </Button>
                </View>
                {/*
                 <View style={{ flexDirection:'row'  }}>
                 <Upload storyId={'14_2'}/>
                 </View>
                */}

                <Text>{description}</Text>
            </CardItem>
        </Card>
    );
  }
}

StoryCard.propTypes = {
    category: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    description: React.PropTypes.string.isRequired,
    duration_splitted: React.PropTypes.shape({
        minutes: React.PropTypes.number,
        seconds: React.PropTypes.number
    }),
    price: React.PropTypes.number.isRequired,
    img_urls: React.PropTypes.shape({
        large: React.PropTypes.string
    }),
    onBuyClick: React.PropTypes.func,
    onConnectBear: React.PropTypes.func,
    isBought: React.PropTypes.bool,
    isConnected: React.PropTypes.bool,
    logo: React.PropTypes.string.isRequired,
    downloaded: React.PropTypes.number,
    isDownloading: React.PropTypes.bool,
    id: React.PropTypes.number,
    goToInteractive: React.PropTypes.func
};