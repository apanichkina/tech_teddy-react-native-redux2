/**
 * Created by ihelos on 01.12.16.
 */
import React, {Component} from 'react';
import {Image} from 'react-native';
import {Container, Icon, View, DeckSwiper, Card, CardItem, Thumbnail, Text} from 'native-base';

export default class DeckSwiperExample extends Component {

    render() {
        return (
            <Container>
                <View>
                    <DeckSwiper
                        dataSource={this.props.cards}
                        renderItem={item =>
                            <Card style={{elevation: 3}}>
                                < CardItem >
                                    < Thumbnail source={item.image}/>
                                    <Text>{item.text}</Text>
                                    <Text note>NativeBase</Text>
                                </CardItem>
                                <CardItem>
                                    <Image style={{resizeMode: 'cover', width: null}} source={item.image}/>
                                </CardItem>
                                <CardItem>
                                    <Icon name="ios-heart" style={{color: '#ED4A6A'}}/>
                                    <Text>{item.name}</Text>
                                </CardItem>
                            </Card>
                        }
                    />
                </View>
            </Container>
        );
    }
}

DeckSwiperExample.propTypes = {
    cards: React.PropTypes.array.isRequired
};