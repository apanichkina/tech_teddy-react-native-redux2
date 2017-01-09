import React from 'react'
import PropTypes  from 'react'
import {  CardItem, Text, Button, Thumbnail } from 'native-base';

export default class Story extends React.Component {

    render() {
        const { onClick, name, duration, price, img_urls } = this.props;
        return (
            <CardItem button onPress={onClick}>
                <Thumbnail square size={100}  source={{uri: img_urls.small}} />
                <Text>{name.toUpperCase()}</Text>
                <Text note>Длительность: {duration}</Text>
                {/* <Text note>Цена: {price}</Text> */}
            </CardItem>

        );
    }
}
Story.propTypes = {
    onClick: React.PropTypes.func.isRequired,
    name: React.PropTypes.string.isRequired,
    category: React.PropTypes.number.isRequired,
    duration: React.PropTypes.string.isRequired,
    img_urls: React.PropTypes.shape({
        small: React.PropTypes.string.isRequired
    }).isRequired,
    price: React.PropTypes.number.isRequired
};