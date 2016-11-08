import React from 'react'
import PropTypes  from 'react'
import {  CardItem, Text, Button, Thumbnail } from 'native-base';

export default class Story extends React.Component {

    render() {
        const { onClick, name, minutes, seconds, price, illustration } = this.props;
        return (
            <CardItem button onPress={onClick}>
                <Thumbnail square size={100}  source={illustration} />
                <Text>Имя: {name}</Text>
                <Text note>Длительность: {minutes}:{seconds}</Text>
                <Text note>Цена: {price}</Text>
            </CardItem>

        );
    }
}
Story.propTypes = {
    onClick: React.PropTypes.func.isRequired,
    name: React.PropTypes.string.isRequired,
    category: React.PropTypes.number.isRequired,
    minutes: React.PropTypes.number.isRequired,
    seconds: React.PropTypes.number.isRequired,
    price: React.PropTypes.number.isRequired,
    illustration: React.PropTypes.object.isRequired,
};