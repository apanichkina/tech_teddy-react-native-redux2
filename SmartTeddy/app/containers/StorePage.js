
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, Header, Title, View, Button, Icon, Tabs, Spinner, Text } from 'native-base';
import { openDrawer } from '../actions/drawer';
import { popRoute } from '../actions/route';
import myTheme from '../themes/base-theme';
import StorePage from './StoryList';
import { PossiblePurposes } from '../actions/actionTypes'


class Store extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
      title: React.PropTypes.string.isRequired,
      stories: React.PropTypes.array.isRequired,
      isFetching: React.PropTypes.bool.isRequired
  };
  render() {
    const { openDrawer, title, stories, categories, isFetching, isInternet} = this.props;
    return (
      <Container theme={myTheme}>
        <Header style={{shadowOffset: {width: 0, height: 0}, elevation: 0 }} >
          <Title>{title}</Title>

          <Button transparent onPress={openDrawer}>
            <Icon name="ios-menu" />
          </Button>
        </Header>

          {!isInternet && !stories.length?
              <Content>
                <Text>Отсутствует соединение с интернетом</Text>
              </Content>
              :
              isFetching ?
              <Content>
                  <Spinner style={{ alignSelf: 'center' }} />
              </Content>
              :<View>
                <Tabs locked >
                    {categories.map(category =>
                        <StorePage
                            key={category.id}
                            tabLabel={category.name.toUpperCase()}
                            filter={category.id}
                            stories={stories}
                            />)}
                </Tabs>
                </View>

          }

      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      isInternet: state.internet.isConnected,
      categories: state.storyCategory.categories
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    openDrawer: () => dispatch(openDrawer())
  }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Store)