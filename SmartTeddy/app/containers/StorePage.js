
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Title, View, Button, Icon, Tabs, Spinner } from 'native-base';
import { openDrawer } from '../actions/drawer';
import { popRoute } from '../actions/route';
import myTheme from '../themes/base-theme';
import StorePage from './StoryList';
import { PossiblePurposes } from '../actions/actionTypes'
import Alarm from '../components/BearProfile/alarmPage'
class Store extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
      title: React.PropTypes.string.isRequired,
      stories: React.PropTypes.array.isRequired,
      content: React.PropTypes.string.isRequired
  };
  render() {
    const { openDrawer, title, stories, categories, content} = this.props;
    return (
      <Container theme={myTheme}>
        <Header>
          <Title>{title}</Title>

          <Button transparent onPress={openDrawer}>
            <Icon name="ios-menu" />
          </Button>
        </Header>

        <View>
            <Tabs locked>
            {categories.map(category =>
                  <StorePage
                      key={category.id}
                      tabLabel={category.name}
                      filter={category.id}
                      stories={stories}
                      content={content}
                      />

          )
            }
          </Tabs>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
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