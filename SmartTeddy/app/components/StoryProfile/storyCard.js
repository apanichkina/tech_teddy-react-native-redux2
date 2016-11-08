import React, { Component } from 'react';
import {  Button, Icon, Card, CardItem, Text, View } from 'native-base';
import { Image } from 'react-native';
import styles from './styles';

const illustration_default = require('../../../img/illustration2.jpg');
export default class StoryCard extends Component {

  render() {
    const { name, illustration, price, description, onBuyClick, onUploadClick, onDeleteClick, isUpload, isBought, logo, category, isConnected, onConnectBear, onPlay, isPlaying, onPause   } = this.props;
    return (
        <Card style={[styles.mb, { flex: 0 }]}>

            <CardItem>
                <Icon name={logo}/>
                <Text>{name}</Text>
                <Text note>{category}</Text>
            </CardItem>

            <CardItem cardBody >
                <Image style={{ resizeMode: 'cover', width: null}} source={illustration}/>

                <View style={{ flexDirection:'row'}}>
                    {isUpload ? <Button style={{ margin: 6, marginLeft:0, flex:1}} onPress={onPlay}>
                        <Icon name="ios-play" style={{ color: '#fff', margin: 5 }}/>
                    </Button> : null}
                    {isPlaying ? <Button style={{ margin: 6, marginLeft:0, flex:1}} onPress={onPause}>
                        <Icon name="ios-pause" style={{ color: '#fff', margin: 5 }}/>
                    </Button> : null}

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

                <View style={{ flexDirection:'row'  }}>
                    {!isBought ?
                        <Button style={{ margin: 6, marginLeft:0, flex: 2}}
                                onPress={onBuyClick}>
                            <Icon name="ios-basket" />
                            {!!price ?
                                <Text style={{ color: '#fff'}}>{price} руб.</Text>
                                : <Text style={{ color: '#fff'}}>Бесплатно</Text>
                            }
                        </Button>
                        :  !isConnected ?
                            <Button style={{ margin: 6, marginLeft:0, flex:2, backgroundColor:'#F06292'}} onPress={onConnectBear}>
                                Примедведиться
                            </Button>
                        : isUpload ?
                            <Button style={{ margin: 6, marginLeft:0, flex:2}} onPress={onDeleteClick}>
                                <Icon name="ios-trash" />
                            </Button>
                        :   <Button style={{ margin: 6, marginLeft:0, flex:2}} onPress={onUploadClick}>
                                <Icon name="ios-cloud-upload" />
                            </Button>

                    }

                    <Button style={{ margin: 6, marginLeft:0,marginRight:0, flex: 2}} >
                        <Icon name="ios-share-alt" />
                        <Text>Поделиться</Text>
                    </Button>
                </View>
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
    price: React.PropTypes.number.isRequired,
    illustration: React.PropTypes.object.isRequired,
    onBuyClick: React.PropTypes.func,
    onUploadClick: React.PropTypes.func,
    onDeleteClick: React.PropTypes.func,
    onConnectBear: React.PropTypes.func,
    onPlay: React.PropTypes.func,
    onPause: React.PropTypes.func,
    isPlaying: React.PropTypes.func,
    isUpload: React.PropTypes.bool,
    isBought: React.PropTypes.bool,
    isConnected: React.PropTypes.bool,
    logo: React.PropTypes.string.isRequired
};