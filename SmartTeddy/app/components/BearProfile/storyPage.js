
import React, { Component } from 'react';

import { Container, Content, Card, CardItem, Text, View, Thumbnail, List, ListItem, Icon, Button } from 'native-base';
import { TouchableHighlight, Image} from "react-native";
import styles from './styles';
import { connect } from 'react-redux';
import { popRoute, pushNewRoute } from '../../actions/route';
import ActionButton from 'react-native-action-button';
import myTheme from '../../themes/base-theme';
class TabOne extends Component { // eslint-disable-line
  static propTypes = {
    popRoute: React.PropTypes.func,
    pushNewRoute: React.PropTypes.func
  }

  popRoute() {
    this.props.popRoute();
  }
  pushNewRoute(route) {
    this.props.pushNewRoute(route);
  }
  themes_edu = [
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
  themes_fun = [
    {
      name: 'Свинка Пепка',
      image: require('../../../img/pepa.jpeg'),
      duration: '20:30',
      price: 20,
      route: ()=>{this.pushNewRoute('story-profile')}
    },
    {
      name: 'Маша и медведь',
      image: require('../../../img/masha.jpeg'),
      duration: '20:30',
      price: 20,
      route: ()=>{this.pushNewRoute('story-profile')}
    }
  ];


  render() { // eslint-disable-line
    return (
      <Container theme={myTheme} style={styles.container}>
        <Content padder>
            <List  style={{ zIndex: 10}}>
            <ListItem itemDivider>
              <Text>Образовательные</Text>
            </ListItem>
            <Card dataArray={this.themes_edu}
                  renderRow={(theme) =>
                            <CardItem button onPress={theme.route}>
                                <Thumbnail square size={100} source={theme.image} />
                                <Text>{theme.name}</Text>
                                <Text note>Длительность: {theme.duration}</Text>
                                <Text note>Цена: {theme.price}</Text>
                            </CardItem>
                        }>
            </Card>
            <ListItem itemDivider>
              <Text>Развлекательные</Text>
            </ListItem>
            <Card dataArray={this.themes_fun}
                  renderRow={(theme) =>
                            <CardItem button onPress={theme.route}>
                                <Thumbnail square size={100} source={theme.image} />
                                <Text>{theme.name}</Text>
                                <Text note>Длительность: {theme.duration}</Text>
                                <Text note>Цена: {theme.price}</Text>
                            </CardItem>
                        }>
            </Card>
          </List>
            <TouchableHighlight style={styles.addButton} underlayColor='#F06292' onPress={()=>{console.log('pressed')}}>
                <Image
                    style={{height: 24, width: 24}}
                    source={require('../../../img/plus.png')}
                    />
            </TouchableHighlight>
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