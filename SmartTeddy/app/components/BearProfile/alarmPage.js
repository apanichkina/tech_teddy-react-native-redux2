
import React, { Component } from 'react';

import { Container, Content, Card, CardItem, Text, View, Thumbnail } from 'native-base';

import styles from './styles';
import { connect } from 'react-redux';
import { popRoute, pushNewRoute } from '../../actions/route';

class TabOne extends Component { // eslint-disable-line
  static propTypes = {
    popRoute: React.PropTypes.func,
    pushNewRoute: React.PropTypes.func,
    tabLabel: React.PropTypes.string
  }

  popRoute() {
    this.props.popRoute();
  }
  pushNewRoute(route) {
    this.props.pushNewRoute(route);
  }
  themes = [
    {
      name: 'Свинка Пепка',
      image: require('../../../img/pepa.jpeg'),
      duration: '20:30',
      price: 20,
      route: ()=>{this.pushNewRoute('story-profile')}
    },
    {
      name: 'Три Кота',
      image: require('../../../img/3kota.jpeg'),
      duration: '20:30',
      price: 20,
      route: ()=>{this.pushNewRoute('story-profile')}
    }
  ];

  render() { // eslint-disable-line
    return (
      <Container style={styles.container}>
        <Content padder>

        </Content>
      </Container>
    );
  }
}
function bindAction(dispatch) {
  return {
    popRoute: () => dispatch(popRoute()),
    pushNewRoute: route => dispatch(pushNewRoute(route))
  };
}

export default connect(null, bindAction)(TabOne);